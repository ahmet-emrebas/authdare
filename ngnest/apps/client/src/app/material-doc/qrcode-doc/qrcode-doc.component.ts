import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import 'qrcode';
import { toCanvas } from 'qrcode';
import { QRCode } from 'jsqr';

@Component({
  selector: 'app-qrcode-doc',
  templateUrl: './qrcode-doc.component.html',
  styleUrls: ['./qrcode-doc.component.scss'],
})
export class QrcodeDocComponent implements OnInit {
  readData!: QRCode;
  ngOnInit(): void {}

  setReadData(qrData: QRCode) {
    console.log(qrData);
    this.readData = qrData;
  }
}
