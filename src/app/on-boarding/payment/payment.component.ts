import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSignOutAlt, faCheckCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from 'src/app/system.service';
import { environment } from 'src/environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  faExit = faSignOutAlt;
  faCheckCircle = faCheckCircle;
  faCircleNotch = faCircleNotch;
  form: FormGroup;
  loading = false;
  submitted = false;
  stripe: Stripe;

  stripeRole: String;

  meiPlanRole = environment.meiPlanRole;
  meiPlan = environment.meiPlan;
  defaultPlanRole = environment.defaultPlanRole;
  defaultPlan = environment.defaultPlan;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth,
    private sys: SystemService, private router: Router, private afStore: AngularFirestore,
    private route: ActivatedRoute) {
      this.stripe = null;
      loadStripe(environment.stripeApiKey).then((stripe) => {
        this.stripe = stripe;
      });
    }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(take(1))
      .toPromise()
      .then((params) => {
        const refresh = params.get('refreshToken') === 'true';
        if (refresh) {
          this.sys.openLoading('Atualizando informações do plano...')
          this.afAuth.currentUser
          .then((user) => {
            user?.getIdTokenResult(true).then((tokenResult) => {
              this.stripeRole = tokenResult.claims.stripeRole;
            });
          })
          .finally(() => {
            this.sys.closeLoading();
          })
        }
      })
    this.form = this.fb.group({});
  }

  async createSessionMei() {
    this.sys.openLoading('Redirecionando...')
    const user = await this.afAuth.currentUser;
    const docRef = await this.afStore
      .collection(`customers/${user?.uid}/checkout_sessions`)
      .add({
        price: this.meiPlan,
        success_url: window.location.href + '?refreshToken=true',
        cancel_url: window.location.href,
      })
    docRef.onSnapshot(
      (snap: any) => {
        console.log(snap.data());
        if (snap.exists && this.stripe) {
          const sessionId = snap.data().sessionId;
          this.stripe.redirectToCheckout({ sessionId });
          this.sys.closeLoading()
        } else {
          this.sys.closeLoading()
        }
      },
      (error: any) => {
        if (error) {
          alert(`An error occured: ${error.message}`);
        }
        this.sys.closeLoading()
      }
    );
  }

  async createSessionBasic() {
    this.sys.openLoading('Redirecionando...')
    const user = await this.afAuth.currentUser;
    const docRef = await this.afStore
      .collection(`customers/${user?.uid}/checkout_sessions`)
      .add({
        price: this.defaultPlan,
        success_url: window.location.href + '?refreshToken=true',
        cancel_url: window.location.href,
      })
    docRef.onSnapshot(
      (snap: any) => {
        console.log(snap.data());
        if (snap.exists && this.stripe) {
          const sessionId = snap.data().sessionId;
          this.stripe.redirectToCheckout({ sessionId });
          this.sys.closeLoading()
        } else {
          this.sys.closeLoading()
        }
      },
      (error: any) => {
        if (error) {
          alert(`An error occured: ${error.message}`);
        }
        this.sys.closeLoading()
      }
    );
  }

  async logout() {
    await this.afAuth.signOut()
    this.sys.showToast('Você saiu.', { classname: 'bg-info text-light', delay: 4000 })
    this.router.navigate(['/auth/entrar'])
  }
}
