import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { switchMap, take, map, takeLast } from 'rxjs/operators';
import firebase from 'firebase';
import * as moment from 'moment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Claims {
  [key: string]: any;
}

export interface DocumentData {
  name: string,
  downloadURL: string,
  customMetadata: {
    [key: string]: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  currentUser$: Observable<firebase.User>
  claims$: Observable<Claims>
  cnpj: string;
  token: string;
  _docsUpdated: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private afStorage: AngularFireStorage, private afAuth: AngularFireAuth, private http: HttpClient) {
    this.currentUser$ = from(this.afAuth.currentUser);
    this.claims$ = this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return from(
            user.getIdTokenResult(false).then((tokenResult) => {
              this.token = tokenResult.token;
              return tokenResult.claims;
            })
          );
        } else {
          return of(null);
        }
      })
    )
  }

  getFiles(relativePath: string) : Observable<DocumentData[]>  {
    return this.claims$
      .pipe(
        switchMap((claims: Claims) => {
          this.cnpj = claims.company;
          if (this.cnpj) {
            return this._docsUpdated.pipe(
              switchMap(() => {
                return this.afStorage.ref(`empresas/${this.cnpj}/documentos/${relativePath}`).listAll();
              })
            );
          } else {
            return of(null);
          }
        }),
        switchMap((result) => {
          if (result) {
            return from(Promise.all(result.items.map(async (item) => {
              const url = await item.getDownloadURL();
              const metadata = await item.getMetadata();
              
              return {
                name: item.name,
                downloadURL: url,
                customMetadata: metadata.customMetadata ?? {}
              };
            })));
          } else {
            return of([]);
          }
        })
      );
  }

  getFile(relativePath: string) : Observable<DocumentData>  {
    return this.claims$
      .pipe(
        switchMap((claims: Claims) => {
          this.cnpj = claims.company;
          if (this.cnpj) {
            return this._docsUpdated.pipe(
              map(() => {
                return this.afStorage.ref(`empresas/${this.cnpj}/documentos/${relativePath}`);
              })
            );
          } else {
            return of(null);
          }
        }),
        switchMap((result) => {
          if (result) {
            const item = result;

            return from(new Promise<DocumentData>(async (resolve) => {
              const url = await item.getDownloadURL().toPromise();
              const metadata = await item.getMetadata();
                
              resolve(<DocumentData>{
                name: item.name,
                downloadURL: url,
                customMetadata: metadata.customMetadata ?? {}
              });
            }))
            
          } else {
            return of(<DocumentData>{});
          }
        })
      );
  }

  uploadDocument(file, path, metadata: {}) {
    const uploadTask = this.afStorage.ref(`empresas/${this.cnpj}/documentos/${path}`).put(file, metadata);
    uploadTask.task.on('state_changed', () => null, () => null, () => {
      this._docsUpdated.next(true);
    })
    return uploadTask;
  }

  async updateDocument(params = {}) {
    const headers = {"Authorization": `Bearer ${this.token}`}
    return await this.http.post<HttpResponse<any>>(`${environment.baseApiUrl}/companies/${this.cnpj}/documents`, params, {headers: headers})
    .pipe(take(1))
    .toPromise()
    .then((response) => {
      this._docsUpdated.next(true);
      return response;
    });
  }
}
