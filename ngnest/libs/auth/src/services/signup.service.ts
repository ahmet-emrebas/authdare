import { EmailService } from './email.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from './user.service';
import { SignupDTO, CreateUserDTO } from '../user';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class SignupService {
    private readonly logger = new Logger(SignupService.name);

    constructor(private readonly userService: UserService, private readonly emailService: EmailService) {}

    async signup(user: SignupDTO) {
        const createdUser = await this.createNewSusbscription(user);
        await this.emailService.greeting(user.email);
        return createdUser;
    }

    private async createNewSusbscription(user: SignupDTO) {
        const userPermissions = ['all:all'];
        const orgname = user.orgname;

        const isUserExist = await this.userService.isExist({ where: [{ orgname }, { email: user.email }] });

        if (isUserExist) {
            throw new BadRequestException('Account already exists!');
        }

        const { errors, validatedInstance } = await new CreateUserDTO({ ...user, permissions: userPermissions }).transformAndValidate();

        if (errors) {
            this.logger.error('Could not validate the user for some reason!', errors, validatedInstance);
            throw new InternalServerErrorException();
        }

        return await this.userService.create(validatedInstance);
    }

    async createClientResources(orgname: string) {}
}
