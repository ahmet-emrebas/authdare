import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QrcodeModule } from '@authdare/qrcode';
import { InvoiceComponent } from './invoice.component';



@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    QrcodeModule,
  ],
  exports: [
    InvoiceComponent
  ]
})
export class InvoiceModule { }
