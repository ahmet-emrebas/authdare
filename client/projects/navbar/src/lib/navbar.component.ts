import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'authdare-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private service: NavbarService) {}

  ngOnInit(): void {
    this.service.entities$.subscribe((data) => {
      console.log(data);
    });
  }
}
