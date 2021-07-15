import { Component, Input, OnInit } from '@angular/core';

export interface ProductCard {
  title: string;
  subtitle: string;
  imgs: string[];
  content: string;
  features: string[];
  action: string;
}

@Component({
  selector: 'lib-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() card: Partial<ProductCard> = {
    action: 'Card Action',
    content: 'Card content',
    features: ['Feature one', 'Feature one', 'Feature one', 'Feature one'],
    imgs: [],
    subtitle: 'Sub title',
    title: 'Title ',
  };
  constructor() {}

  ngOnInit(): void {}
}
