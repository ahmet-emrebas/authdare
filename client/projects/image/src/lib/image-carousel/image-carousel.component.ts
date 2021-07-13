import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'authdare-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
})
export class ImageCarouselComponent implements OnInit {
  @Input() imgs!: string[];
  constructor() {}

  ngOnInit(): void {}
}
