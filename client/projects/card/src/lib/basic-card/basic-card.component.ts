import { Component, Input, OnInit } from '@angular/core';

export interface BasicCard {
  title: string;
  subtitle: string;
  content: string;
  img: string;
  action: string;
  path: string;
}

@Component({
  selector: 'authdare-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css'],
})
export class BasicCardComponent implements OnInit {
  @Input() card: Partial<BasicCard> = {
    action: 'Action Label',
    title: 'Card title',
    subtitle: 'Subtitle of the card',
    content: 'Some content ',
    img: 'assets/imgs/cars/1.png',
    path: '/',
  };
  constructor() {}
  ngOnInit(): void {}
}
