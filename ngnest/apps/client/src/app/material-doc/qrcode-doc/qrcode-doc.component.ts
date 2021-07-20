import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import 'qrcode';
import { toCanvas } from 'qrcode';
import * as jsqr from 'jsqr';

const QRCode = jsqr.default;

@Component({
  selector: 'app-qrcode-doc',
  templateUrl: './qrcode-doc.component.html',
  styleUrls: ['./qrcode-doc.component.scss'],
})
export class QrcodeDocComponent implements OnInit {
  ngOnInit(): void {}
}
