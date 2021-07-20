import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeReaderComponent } from './qrcode-reader/qrcode-reader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QrcodeGenComponent } from './qrcode-gen/qrcode-gen.component';

@NgModule({
  declarations: [QrcodeReaderComponent, QrcodeGenComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [QrcodeReaderComponent, QrcodeGenComponent],
})
export class QrcodeModule {}
