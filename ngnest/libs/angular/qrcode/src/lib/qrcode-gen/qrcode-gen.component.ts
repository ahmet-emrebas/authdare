import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { toCanvas } from 'qrcode';
@Component({
  selector: 'authdare-qrcode-gen',
  templateUrl: './qrcode-gen.component.html',
  styleUrls: ['./qrcode-gen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrcodeGenComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() qrData!: string;
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    toCanvas(this.canvas.nativeElement, this.qrData, function (error) {
      if (error) {
        console.error(error);
      }
    });
  }
}
