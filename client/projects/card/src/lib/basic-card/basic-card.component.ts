import { Component, Input, OnInit } from '@angular/core';

export interface BasicCard {
  title: string;
  subtitle: string;
  content: string;
  img: string;
  action: string;
}

@Component({
  selector: 'authdare-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.css'],
})
export class BasicCardComponent implements OnInit {
  @Input() card: Partial<BasicCard> = {};
  constructor() {}
  ngOnInit(): void {}
}
