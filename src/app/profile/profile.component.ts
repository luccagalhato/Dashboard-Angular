import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCamera, faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  faCamera = faCamera;
  faSave = faSave;
  form: FormGroup;
  submitted: boolean;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          ),
        ],
      ],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      taxInvoice: [false],
      taxes: [false],
      reminders: [false],
      documents: [false],
    });
  }

  submit() {
    this.submitted = true;
  }

  ngOnInit(): void {}
}
