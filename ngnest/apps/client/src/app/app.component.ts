import { BASE_PATH_PROVIDER_TOKEN } from './providers/http.provider';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NavbarItem } from '@authdare/navbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  navbarItems: NavbarItem[] = [
    {
      icon: 'source',
      path: 'material-doc',
      type: 'INTERNAL',
    },
  ];
  title = 'client';

  constructor(
    private readonly http: HttpClient,
    @Inject(BASE_PATH_PROVIDER_TOKEN) private readonly basePath: string
  ) { }
  ngOnInit(): void {
    this.http.get(this.basePath + '/-json').subscribe(data => {
      console.log(data);
    })
  }


}
