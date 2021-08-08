import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {} from 'axios';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private readonly httpClient: HttpClient) {}

    ngOnInit(): void {
        const signup = this.httpClient.post('/auth/signup', {
            email: 'aemrebas.dev@gmail.com',
            orgname: 'aemrebas',
            password: 'password',
        });

        const tasks = this.httpClient.get('/api/tasks');

        firstValueFrom(tasks).then((data) => {
            console.log(data);
        });
    }
}
