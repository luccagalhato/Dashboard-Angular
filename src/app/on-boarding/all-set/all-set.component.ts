import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { faSignOutAlt, faCheckCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from 'src/app/system.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-all-set',
  templateUrl: './all-set.component.html',
  styleUrls: ['./all-set.component.scss']
})
export class AllSetComponent implements OnInit {
  faExit = faSignOutAlt;
  faCheckCircle = faCheckCircle;
  faCircleNotch = faCircleNotch;
  stripe: Stripe | null;

  constructor(private afAuth: AngularFireAuth, public afStore: AngularFirestore, public location: Location,
    private sys: SystemService, private router: Router) {
      this.stripe = null;
      loadStripe(environment.stripeApiKey).then((stripe) => {
        this.stripe = stripe;
      })
    }

  ngOnInit(): void {
  }

  async logout() {
    await this.afAuth.signOut()
    this.sys.showToast('Você saiu.', { classname: 'bg-info text-light', delay: 4000 })
    this.router.navigate(['/auth/entrar'])
  }

  async createSession() {
    const user = await this.afAuth.currentUser;
    const docRef = await this.afStore.collection(`customers/${user?.uid}/checkout_sessions`).add({
      price: 'price_1INU13KoiigdnEONzAF0FN6T',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })
    docRef.onSnapshot((snap: any) => {
      if (snap.exists && this.stripe) {
        const sessionId = snap.data().sessionId
        this.stripe.redirectToCheckout({ sessionId });
      }
    }, (error: any) => {
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
    });
  }
}
