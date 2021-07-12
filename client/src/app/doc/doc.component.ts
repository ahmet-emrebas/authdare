import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { datatype, lorem } from 'faker';
import {
  CarouselItem,
  CarouselService,
} from 'projects/carousel/src/public-api';
import { NavbarService } from 'projects/navbar/src/public-api';
import { setSidenavTitle, setSidenavItems } from 'projects/sidenav/src/lib';

function fakeCarouselItem(): CarouselItem {
  return {
    id: datatype.number(900),
    groupId: 1,
    title: lorem.words(2),
    actionLabel: 'Action',
    blendColor: 'rgba(0, 0, 0,0.6)',
    summary: lorem.words(10),
    content: lorem.sentences(2),
    duration: datatype.number(3000),
    img: `assets/imgs/cars/1.png`,
  };
}
@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {
  constructor(
    private store: Store,
    private navbarService: NavbarService,
    private carouselService: CarouselService
  ) {}

  ngOnInit(): void {
    this.carouselService.addManyToCache([
      fakeCarouselItem(),
      fakeCarouselItem(),
      fakeCarouselItem(),
      fakeCarouselItem(),
    ]);

    this.navbarService.addManyToCache([
      {
        id: 1,
        groupId: 1,
        order: 1,
        icon: 'home',
        path: '/',
        tooltip: 'Home page',
        type: 'INTERNAL',
      },
      {
        id: 2,
        groupId: 1,
        order: 2,
        icon: 'info',
        path: 'about',
        tooltip: 'About page',
        type: 'INTERNAL',
      },
      {
        id: 3,
        groupId: 1,
        order: 3,
        icon: 'email',
        path: 'mailto: info@authdare.com',
        tooltip: 'Contact page',
        type: 'EXTERNAL',
      },
      {
        id: 4,
        groupId: 1,
        order: 4,
        icon: 'phone',
        path: 'tel:8328742422',
        tooltip: 'Call',
        type: 'EXTERNAL',
      },
    ]);

    this.store.dispatch(
      setSidenavTitle({ sidenavTitle: 'Authdare Material Doc' })
    );
    this.store.dispatch(
      setSidenavItems({
        sidenavItems: [
          { path: 'form', label: 'Form', icon: 'input' },
          { path: 'chart', label: 'Chart', icon: 'bar_chart' },
          { path: 'navbar', label: 'Navbar', icon: 'menu' },
          { path: 'basic-card', label: 'Basic Card', icon: 'payments' },
          { path: 'product-card', label: 'Product Card', icon: 'payments' },
          { path: 'image-carousel', label: 'Image Carausel', icon: 'image' },
          { path: 'image-deck', label: 'Image Deck', icon: 'image' },
          { path: 'image-grid', label: 'Image Grid', icon: 'image' },
          { path: 'carousel', label: 'Carousel', icon: 'live_tv' },
        ],
      })
    );
  }
}
