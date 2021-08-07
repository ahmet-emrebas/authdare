import { UserService } from './user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../user';

@Injectable()
export class CreateMemberService {
    constructor(private userService: UserService) {}

    async createMember(userdata: CreateUserDTO) {
        const isUserExist = await this.userService.isExistByEmail(userdata.email);

        if (isUserExist) throw new BadRequestException('The member already exist in your team');

        return await this.userService.create(userdata);
    }
}
