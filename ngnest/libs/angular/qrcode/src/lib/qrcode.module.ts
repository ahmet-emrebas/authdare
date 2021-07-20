import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './qrcode.component';
import { QrcodeReaderComponent } from './qrcode-reader/qrcode-reader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [QrcodeComponent, QrcodeReaderComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [QrcodeComponent, QrcodeReaderComponent],
})
export class QrcodeModule {}
