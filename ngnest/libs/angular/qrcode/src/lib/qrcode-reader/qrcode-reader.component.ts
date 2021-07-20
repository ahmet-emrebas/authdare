import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import {} from 'qrcode';
import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';
import { debounceTime } from 'rxjs/operators';

import * as jsqr from 'jsqr';
const QRCode = jsqr.default;

@Component({
  selector: 'authdare-qrcode-reader',
  templateUrl: './qrcode-reader.component.html',
  styleUrls: ['./qrcode-reader.component.css'],
})
export class QrcodeReaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('qrInput') qrInput!: ElementRef<HTMLInputElement>;
  @ViewChild('img') img!: ElementRef<HTMLImageElement>;

  /**
   * There are two type of scanning, file and camera scanning. Default scanning type is file scanning.
   */
  @Input() scanType: 'camera' | 'file' = 'file';
  /**
   * After successfull scanning, emit the decoded data.
   */
  @Output() onRead = new EventEmitter<any>();

  /**
   * When QR is valid, indicate it by style.
   */
  isValidQR: boolean | undefined = undefined;

  /**
   * When QR is scanning, indicate it by style animation.
   */
  isScanning: boolean = false;

  subsink = new SubSink();

  canvasStateReadyToRead$ = new BehaviorSubject<boolean>(false);

  videoInterval: any;

  constructor() {}

  async ngOnInit() {
    this.subsink.sink = this.canvasStateReadyToRead$
      .pipe(debounceTime(1000))
      .subscribe(async (isReady) => {
        if (isReady) {
          this.isScanning = true;
          const scannedCode = await this.scanCode(
            this.canvas.nativeElement.getContext('2d')!
          );
          if (scannedCode) {
            console.log(scannedCode);
            this.onRead.emit(scannedCode);
            this.clearState();
            this.isValidQR = true;
          } else {
            console.log(scannedCode);
            this.isValidQR = false;
          }
        }
      });
  }
  ngAfterViewInit(): void {
    if (this.scanType == 'camera') {
      this.scanFromCamere();
    }
  }

  async ngOnDestroy() {
    this.clearState();
  }

  clearState() {
    this.videoInterval && clearInterval(this.videoInterval);
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx!.fillStyle = 'white';
    ctx?.fillRect(0, 0, 300, 300);
    this.img.nativeElement.src = '';
    this.qrInput.nativeElement.value = '';
    this.qrInput.nativeElement.files = null;
    this.isScanning = false;
    this.video.nativeElement.srcObject = null;
  }

  async captureVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const videoEl = this.video.nativeElement;
    videoEl.srcObject = stream;
  }

  async drawElementToCanvas(source: HTMLVideoElement | HTMLImageElement) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const canvasEl = this.canvas.nativeElement;
        const ctx = canvasEl.getContext('2d');
        ctx?.drawImage(source, 0, 0, 300, 300);
      }, 1);

      setTimeout(() => {
        this.canvasStateReadyToRead$.next(true);
        res(true);
      }, 10);
    });
  }

  /**
   * Render the video resouce to canvas and read QR code from it.
   */
  async scanFromCamere() {
    this.scanType = 'camera';
    this.video.nativeElement.onloadeddata = () => {
      this.videoInterval = setInterval(async () => {
        await this.drawElementToCanvas(this.video.nativeElement);
      }, 2000);
    };
    await this.captureVideo();
  }

  /**
   * Render the user input image to canvas and read QR code from it.
   */
  async scanFromFile() {
    this.scanType = 'file';
    this.clearState();
    const el = this.qrInput.nativeElement;
    if (el && el.files) {
      const file = el.files[0];
      const inputFileData = await this.readInputFile(file);
      await this.setImgSrc(inputFileData as string);
      await this.drawElementToCanvas(this.img.nativeElement);
    } else {
      console.error('No file chosen!');
    }
  }

  /**
   * Set the image source, the img element is a placeholder to help canvas to render user input image.
   * @param {string} imgSrc
   * @returns
   */
  async setImgSrc(imgSrc: string) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        this.img.nativeElement.src = imgSrc;
      }, 1000);
      setTimeout(() => {
        res(true);
      }, 3000);
    });
  }

  /**
   * Read file and return file result;
   * @param {File} file
   * @returns
   */
  async readInputFile(file: File) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      const timeout = setTimeout(() => {
        rej('Could not read file!');
      }, 5000);

      reader.addEventListener('load', () => {
        clearTimeout(timeout);
        res(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  /**
   * Read QR code from the canvas
   * @param {CanvasRenderingContext2D} ctx
   * @returns
   */
  async scanCode(ctx: CanvasRenderingContext2D) {
    return QRCode(ctx?.getImageData(0, 0, 300, 300).data as any, 300, 300);
  }
}
