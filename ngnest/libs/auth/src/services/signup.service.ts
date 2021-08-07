import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from './user.service';
import { SignupDTO, CreateUserDTO } from '../user';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { EmailEvents } from './email.service';

@Injectable()
export class SignupService {
    private readonly logger = new Logger(SignupService.name);

    constructor(private userService: UserService, private events: EventEmitter2) {}

    async signup(user: SignupDTO) {
        const createdUser = await this.createNewSusbscription(user);
        this.events.emit(EmailEvents.GREETING, createdUser.email);
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
