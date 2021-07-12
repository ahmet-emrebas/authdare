import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarouselItem, CarouselService } from './carousel.service';

@Component({
  selector: 'authdare-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  carouselItems: Observable<CarouselItem[]> = this.cauroselService.entities$;

  cx = 50;
  cy = 50;
  r = 20;
  strokeColor = 'white';
  strokeWidth = 5;
  fill = 'transparent';
  strokeDasharray = 'l al-l';
  strokeDashoffset = '0';

  constructor(private cauroselService: CarouselService) {}

  ngOnInit(): void {}
}
