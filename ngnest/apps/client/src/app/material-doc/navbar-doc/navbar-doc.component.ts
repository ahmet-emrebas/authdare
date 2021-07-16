import { Component, OnInit } from '@angular/core';
import { NavbarItem } from '@authdare/navbar';

@Component({
  selector: 'app-navbar-doc',
  templateUrl: './navbar-doc.component.html',
  styleUrls: ['./navbar-doc.component.scss'],
})
export class NavbarDocComponent implements OnInit {
  navbarItems: NavbarItem[] = [
    {
      type: 'INTERNAL',
      path: 'home',
      icon: 'home',
    },
    {
      type: 'INTERNAL',
      path: 'home',
      icon: 'home',
    },
    {
      type: 'INTERNAL',
      path: 'home',
      icon: 'home',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
