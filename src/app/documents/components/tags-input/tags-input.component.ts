import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { find, get, pull } from 'lodash';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TagsInputComponent
    }
  ]
})
export class TagsInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('tagInput') tagInputRef: ElementRef;
  tagControl: string;
  tags: string[] = [];
  disabled = false;
  touched = false;

  constructor() { }

  ngOnInit(): void {
  }

  ///// BEGIN ControlValueAcessor interface
  onChange = (_) => {};

  onTouched = () => {};

  writeValue(tags: string) {
    if (tags) {
      this.tags = tags.split(',');
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  ///// END ControlValueAcessor interface

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    this.markAsTouched();
    const inputValue: string = this.tagControl;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      this.onChange(this.tags.join(','))
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.onChange(this.tags.join(','))
        this.tagControl = '';
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }
}
