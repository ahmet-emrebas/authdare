import { elementAnimations } from './element-animations';
import { routeAnimations } from './route-animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [...routeAnimations, ...elementAnimations],
})
export class AppComponent implements OnInit {
    pageName = 'Unknown';
    isDark = true;

    @HostBinding('class')
    get themeMode() {
        return this.isDark ? 'theme-dark' : 'theme-light';
    }

    constructor(private readonly router: Router) {}
    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            console.log(event);
            if (event instanceof ActivationStart) {
                this.pageName = event.snapshot.data?.pageName || '?';
            }
        });
    }

    toggleTheme() {
        this.isDark = !this.isDark;
        console.log(this.isDark);
    }
}
