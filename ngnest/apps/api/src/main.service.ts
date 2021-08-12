import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MainService {
    @OnEvent('login')
    echo(payload: any) {
        console.log(payload);
    }
    @OnEvent('signup')
    signup(payload: any) {
        console.log(payload);
    }
    @OnEvent('forgot')
    forgot(payload: any) {
        console.log(payload);
    }
}
