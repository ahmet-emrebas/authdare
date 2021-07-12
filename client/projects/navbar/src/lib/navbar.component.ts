import { Component, Input } from '@angular/core';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { map } from 'rxjs/operators';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'authdare-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeOutOnLeaveAnimation()],
})
export class NavbarComponent {
  /**
   * When multiple instance of this component is used, groupId will help us to identify each component and render repectfully.
   */
  @Input() groupId: number = this.service.defaultGroup;
  navbarItems$ = this.service.entities$.pipe(
    map((l) => l.filter((e) => e.groupId == this.groupId)),
    map((l) => l.sort((e, f) => e.order - f.order))
  );
  isMenuOpen = false;
  constructor(private service: NavbarService) {}
}
