import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './qrcode.component';
import { QrcodeReaderComponent } from './qrcode-reader/qrcode-reader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QrcodeGenComponent } from './qrcode-gen/qrcode-gen.component';

@NgModule({
  declarations: [QrcodeComponent, QrcodeReaderComponent, QrcodeGenComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [QrcodeComponent, QrcodeReaderComponent, QrcodeGenComponent],
})
export class QrcodeModule {}
