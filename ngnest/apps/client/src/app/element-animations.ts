import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

export const elementAnimations = [
    fadeInOnEnterAnimation({ anchor: 'eenter', duration: 2000 }),
    fadeOutOnLeaveAnimation({ anchor: 'eleave', duration: 2000 }),
];
