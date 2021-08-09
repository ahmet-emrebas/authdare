import {
    slideInDownOnEnterAnimation,
    slideOutUpOnLeaveAnimation,
    fadeInOnEnterAnimation,
    fadeOutOnLeaveAnimation,
    slideInLeftOnEnterAnimation,
    slideOutLeftOnLeaveAnimation,
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

export const fadeInOut = [
    fadeInOnEnterAnimation({ anchor: 'fadeIn', duration: 400 }),
    fadeOutOnLeaveAnimation({ anchor: 'fadeOut', duration: 400 }),
];

export const toRightLeft = [
    slideInLeftOnEnterAnimation({ anchor: 'toRight', duration: 400 }),
    slideOutLeftOnLeaveAnimation({ anchor: 'toLeft', duration: 400 }),
];
