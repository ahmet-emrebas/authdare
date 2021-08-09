import { BehaviorSubject } from 'rxjs';
import { routeAnimations, fadeInOut, toRightLeft } from './animations';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { SubSink } from 'subsink';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [...routeAnimations, ...fadeInOut, ...toRightLeft],
})
export class AppComponent implements OnInit, OnDestroy {
    pageName = new BehaviorSubject('Home');
    isDark = true;
    subsink = new SubSink();
    @HostBinding('class')
    get themeMode() {
        return this.isDark ? 'theme-dark' : 'theme-light';
    }

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        this.subsink.sink = this.router.events.subscribe((event) => {
            console.log(event);
            if (event instanceof ActivationStart) {
                this.pageName.next(event.snapshot.data?.pageName);
            }
        });
    }
    ngOnDestroy(): void {
        this.subsink.unsubscribe();
    }
    toggleTheme() {
        this.isDark = !this.isDark;
        console.log(this.isDark);
    }
}
