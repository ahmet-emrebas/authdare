import { Component } from '@angular/core';

@Component({
  selector: 'authdare-qrcode',
  templateUrl: './qrcode.component.html',
  styles: [],
})
export class QrcodeComponent {
  // @Output() onRead = new EventEmitter<any>();
  // @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  // @ViewChild('canvas2') canvas2!: ElementRef<HTMLCanvasElement>;
  // @ViewChild('qrInput') qrInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('img') img!: ElementRef<HTMLImageElement>;
  // @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  // constructor() {}
  // async ngOnInit() {
  //   setTimeout(() => {
  //     toCanvas(
  //       this.canvas.nativeElement,
  //       'How long text can add here. I hope I can save lots of texts here . it would be awesome and useful!',
  //       function (error) {
  //         if (error) {
  //           console.error(error);
  //           return;
  //         }
  //         console.log('success!');
  //       }
  //     );
  //   }, 2000);
  // }
  // scanFromCamera() {
  //   if (navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         video: true,
  //         audio: true,
  //       })
  //       .then((stream) => {
  //         this.videoElement.nativeElement.srcObject = stream;
  //         setInterval(() => {
  //           this.canvas2.nativeElement.width =
  //             this.videoElement.nativeElement.clientWidth;
  //           this.canvas2.nativeElement.height =
  //             this.videoElement.nativeElement.clientHeight;
  //           this.canvas2.nativeElement
  //             .getContext('2d')
  //             ?.drawImage(this.videoElement.nativeElement, 0, 0, 300, 300);
  //           this.readFromCanvasContext(
  //             this.canvas2.nativeElement.getContext('2d')!
  //           );
  //         }, 1000);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     alert('Your device does not support this feature!');
  //   }
  // }
  // scanFile(event: any) {
  //   const el = event.target;
  //   const file = el.files[0];
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => {
  //     const ctx = this.canvas.nativeElement.getContext('2d');
  //     if (reader.result) {
  //       this.img.nativeElement.src = reader.result as string;
  //     }
  //     ctx?.drawImage(this.img.nativeElement, 300, 300);
  //     this.readFromCanvasContext(ctx!);
  //   });
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // }
  // readFromCanvasContext(ctx: CanvasRenderingContext2D) {
  //   const r = QRCode(ctx?.getImageData(0, 0, 300, 300).data as any, 300, 300);
  //   console.log(r?.data);
  // }
}
