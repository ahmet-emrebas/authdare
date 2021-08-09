import {
    slideInDownOnEnterAnimation,
    slideOutUpOnLeaveAnimation,
} from 'angular-animations';

export const routeAnimations = [
    slideInDownOnEnterAnimation({
        animateChildren: 'after',
        anchor: 'enter',
        duration: 1000,
    }),
    slideOutUpOnLeaveAnimation({
        animateChildren: 'before',
        anchor: 'leave',
        duration: 1000,
    }),
];
