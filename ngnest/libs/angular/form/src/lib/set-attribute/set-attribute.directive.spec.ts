import { ElementRef } from '@angular/core';
import { SetAttributeDirective } from './set-attribute.directive';

describe('SetAttributeDirective', () => {
  const autocomplete = 'name';
  const maxLength = 100;
  const element = document.createElement('input');
  const elementRef = new ElementRef(element);
  const directive = new SetAttributeDirective(elementRef);

  it('should create an instance', () => {
    directive.authdareSetAttribute = { autocomplete, maxLength };
    directive.ngOnInit();

    expect(directive).toBeTruthy();
  });

  it('should set the attributes', () => {
    expect(element.getAttribute('autocomplete')).toEqual(autocomplete);
    expect(element.getAttribute('maxLength')).toEqual(maxLength + '');
  });
});
