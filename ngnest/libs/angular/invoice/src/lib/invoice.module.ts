import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { QrcodeModule } from '@authdare/qrcode';
import { UtilsModule } from '@authdare/utils';
import { InvoiceComponent } from './invoice.component';



@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    QrcodeModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [
    InvoiceComponent
  ]
})
export class InvoiceModule { }
