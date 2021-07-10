import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'authdare-field-status',
  templateUrl: './field-status.component.html',
  styleUrls: ['./field-status.component.scss'],
  animations: [fadeInOnEnterAnimation()],
})
export class FieldStatusComponent implements OnInit {
  @Input() typingDebounceTime = 400;
  @Input() formControl = new FormControl();

  @Input() loading = true;
  /**
   * Define the field is required or not
   */
  @Input() isRequired = false;

  /**
   * Check the user is typing into the field or not. If typing, then show the spinner.
   */
  typing = false;
  constructor() {}

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        map((__) => (this.typing = true)),
        debounceTime(this.typingDebounceTime)
      )
      .subscribe((__) => {
        this.typing = false;
      });
  }

  backspace() {
    this.formControl.setValue('');
  }

  invalid() {
    return (
      this.formControl.touched &&
      this.formControl.dirty &&
      this.formControl.invalid
    );
  }
  valid() {
    return (
      this.formControl.touched &&
      this.formControl.dirty &&
      this.formControl.valid
    );
  }
  untouched() {
    return this.formControl.untouched || !this.formControl.dirty;
  }
}
