import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { omit, toPairs } from 'lodash';

/**
 * Set attributes for input elements
 */
@Directive({
  selector: '[authdareSetAttribute]',
})
export class SetAttributeDirective implements OnInit {
  /**
   * List of attributes and values
   */
  @Input() authdareSetAttribute!: Partial<HTMLInputElement>;

  /**
   * Ignore list of fields appending to the element attributes.
   */
  @Input() ignoreFields: string[] = [];

  constructor(private el: ElementRef<HTMLInputElement>) {}
  ngOnInit(): void {
    this.authdareSetAttribute = omit(
      this.authdareSetAttribute,
      this.ignoreFields
    );

    if (this.authdareSetAttribute) {
      for (const [key, value] of toPairs(this.authdareSetAttribute)) {
        this.el.nativeElement.setAttribute(key, value as any);
      }
    }
  }
}
