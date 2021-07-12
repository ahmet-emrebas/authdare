import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'authdare-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css'],
})
export class ImageGridComponent implements OnInit {
  @Input() imgs!: string[];
  constructor() {}

  ngOnInit(): void {}
}
