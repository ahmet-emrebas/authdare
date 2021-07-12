import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'authdare-image-deck',
  templateUrl: './image-deck.component.html',
  styleUrls: ['./image-deck.component.css'],
})
export class ImageDeckComponent implements OnInit {
  @Input() imgs!: string[];
  constructor() {}

  ngOnInit(): void {}
}
