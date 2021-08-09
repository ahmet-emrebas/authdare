import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { compare } from 'bcrypt';
import { LoginDTO } from '../user';
import { Messages } from '@authdare/shared-code';

@Injectable()
export class LoginService {
    constructor(private readonly userService: UserService) {}

    /**
     * Try to find the user with credentials and return it, throw BadRequestException otherwise.
     * @param credentials
     * @returns
     */
    async login(credentials: LoginDTO) {
        let isPasswordMatch = false;
        const foundUser = await this.userService.isExistByEmail(credentials.email);
        if (foundUser) {
            isPasswordMatch = await compare(
                credentials.password,
                foundUser.password,
            );
            if (isPasswordMatch) {
                return foundUser;
            }
        } else {
            throw new BadRequestException(Messages.EN.USER_NOT_FOUND);
        }
        throw new BadRequestException(Messages.EN.WRONG_PASSWORD);
    }
}
