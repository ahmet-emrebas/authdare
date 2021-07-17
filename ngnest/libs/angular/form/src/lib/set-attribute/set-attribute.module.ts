import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetAttributeDirective } from './set-attribute.directive';

@NgModule({
  declarations: [SetAttributeDirective],
  imports: [CommonModule],
  exports: [SetAttributeDirective],
})
export class SetAttributeModule {}
