import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  faBars,
  faChevronDown,
  faChevronRight,
  faTachometerAlt,
  faUserFriends,
  faEdit,
  faFileInvoice,
  faChartBar,
  faSearch,
  faCog,
  faBriefcase,
  faBell,
  faCommentAlt,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { SystemService } from '../system.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NfModalComponent } from '../tax-invoices/components/nf-modal/nf-modal.component';
declare var window;

@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss'],
})
export class AuthorizedLayoutComponent implements OnInit {
  @ViewChild('chatBadge') chatBadge: ElementRef;
  title = 'negocio-simples';

  faSearch = faSearch;
  faBars = faBars;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faTachometerAlt = faTachometerAlt;
  faUserFriends = faUserFriends;
  faEdit = faEdit;
  faFileInvoice = faFileInvoice;
  faChartBar = faChartBar;
  faCog = faCog;
  faBriefCase = faBriefcase;
  faBell = faBell;
  faCommentAlt = faCommentAlt;
  faArrowCircleUp = faArrowCircleUp;

  isCollapsed = true;
  sidebarOpen = true;
  stripe: Stripe | null;
  isPremium = false;

  authSubscription: Subscription | null = null;
  innerWidth: number;

  username: string = '';
  _username: string = '';
  avatarUrl: string;
  email: string;
  company$: Observable<any>;

  modalRef!: NgbActiveModal;
  claims: any;

  @ViewChild('sidebar') sidebar: any;

  constructor(
    private afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    private sys: SystemService,
    public router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.stripe = null;
    loadStripe(environment.stripeApiKey).then((stripe) => {
      this.stripe = stripe;
    });
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(take(1))
      .toPromise()
      .then((params) => {
        const refresh = params.get('refreshToken') === 'true';
        this.afAuth.currentUser
          .then((user) => {
            this.username = user.displayName;
            this._username = user.displayName;
            this.email = user.email;
            this.avatarUrl = user.photoURL;
            user
              ?.getIdTokenResult(refresh)
              .then((tokenResult) => {
                this.claims = tokenResult.claims;
                this.company$ = this.afStore
                  .doc(`empresas/${tokenResult?.claims?.company}`)
                  .valueChanges();
                this.isPremium =
                  tokenResult?.claims?.stripeRole === 'mei' ||
                  tokenResult?.claims?.stripeRole === 'premium';
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

    this._username = this.username;
    if (this.innerWidth < 576) {
      this.shortenUsername();
    } else {
      this.username = this._username;
    }
  }

  ngAfterViewInit() {
    window.zDeskOnMessage = (number) => {
      console.log(number);
      if (number > 0) {
        this.chatBadge.nativeElement.style.display = 'inline-flex';
        this.chatBadge.nativeElement.innerHTML = number;
      } else {
        this.chatBadge.nativeElement.style.display = 'none';
      }
    };
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    //In chrome and some browser scroll is given to body tag
    console.log('sei la porra');
  }

  isActive(path: string) {
    return this.router.url.startsWith(path);
  }

  async logout() {
    await this.afAuth.signOut();
    this.sys.showToast('Você saiu.', {
      classname: 'bg-info text-light',
      delay: 4000,
    });
    this.router.navigate(['/auth/entrar']);
  }

  async createSession() {
    this.sys.openLoading('Redirecionando...');
    const user = await this.afAuth.currentUser;
    const docRef = await this.afStore
      .collection(`customers/${user?.uid}/checkout_sessions`)
      .add({
        price: environment.defaultPlan,
        success_url: window.location.href + '?refreshToken=true',
        cancel_url: window.location.href,
      });
    docRef.onSnapshot(
      (snap: any) => {
        console.log(snap.data());
        if (snap.exists && this.stripe) {
          const sessionId = snap.data().sessionId;
          this.stripe.redirectToCheckout({ sessionId });
          this.sys.closeLoading();
        } else {
          this.sys.closeLoading();
        }
      },
      (error: any) => {
        if (error) {
          alert(`An error occured: ${error.message}`);
        }
        this.sys.closeLoading();
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.adjustSidebarSize();

    if (this.innerWidth < 576) {
      this.shortenUsername();
    } else {
      this.username = this._username;
    }
  }

  adjustSidebarSize() {
    this.sidebar.triggerRerender();
  }

  search(event: any) {
    const terms = event.target.value;
    //faz a busca
  }

  shortenUsername() {
    this.username = this.username.slice(0, 6) + '..';
  }

  openModalTest() {
    const config = {
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered custom-modal',
    };
    this.modalRef = this.modalService.open(NfModalComponent, config);
  }

  openChat() {
    window.zE('webWidget', 'prefill', {
      name: {
        value: this.claims.name,
        readOnly: true,
      },
      email: {
        value: this.claims.email,
        readOnly: true,
      },
      phone: {
        value: this.claims.phone_number,
        readOnly: true,
      },
    });
    window.helpPress();
  }
}
