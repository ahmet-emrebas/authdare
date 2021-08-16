import { Injectable, NotImplementedException } from '@nestjs/common';

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
