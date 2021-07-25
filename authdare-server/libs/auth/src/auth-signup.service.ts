import { SignupService } from "@authdare/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthSignupService implements SignupService {

    signup<U = any>(signupDto: U): Promise<string> {
        throw new Error("Method not implemented.");
    }
}