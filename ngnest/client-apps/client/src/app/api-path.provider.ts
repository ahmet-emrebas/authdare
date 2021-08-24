import { Provider } from '@angular/core';
export const API_PATH = 'API_PATH';

export const ApiPathProvider: Provider = {
    provide: API_PATH,
    useValue: 'http://localhost:3000/', // 'https://frozen-brook-04585.herokuapp.com/',
};
