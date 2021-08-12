import { Injectable, NotImplementedException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MainService {
    echo(payload: any) {
        throw new NotImplementedException();
    }

    signup(payload: any) {
        throw new NotImplementedException();
    }

    forgot(payload: any) {
        throw new NotImplementedException();
    }
}
