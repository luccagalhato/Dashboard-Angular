import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name1: [''],
      qualification1: [''],
      participation1: [''],
      name2: [''],
      participation2: [''],
      qualification2: [''],
      name3: [''],
      qualification3: [''],
      participation3: [''],
    });
  }
}
