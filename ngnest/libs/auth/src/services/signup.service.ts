import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from './user.service';

import { CreateUserDTO } from '@authdare/auth/sub';
import { SignupDTO } from '../sub/dto/signup.dto';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { EmailEvents } from './email.service';


@Injectable()
export class SignupService {
    private readonly logger = new Logger(SignupService.name);

    constructor(
        private userService: UserService,
        private events: EventEmitter2
    ) { }

    async signup(user: SignupDTO) {
        const createdUser = await this.createNewSusbscription(user);
        this.events.emit(EmailEvents.GREETING, createdUser.email);
        return createdUser;
    }

    private async createNewSusbscription(user: SignupDTO) {

        const userRole = null; ///TODO SET Client Admin role
        const orgname = user.orgname;

        const isUserExist = await this.userService.isExist({ where: [{ orgname }, { email: user.email }] })

        if (isUserExist) {
            throw new BadRequestException("Account already exists!")
        }


        const { errors, validatedInstance } = await new CreateUserDTO({ ...user, roles: [userRole] })
            .transformAndValidate()


        if (errors) {
            this.logger.error('Could not validate the user for some reason!', errors, validatedInstance);
            throw new InternalServerErrorException()
        }

        return await this.userService.create(validatedInstance);
    }




    async createClientResources(orgname: string) {

    }



}



            // Emitting SIGNUP EVENT
            // this.eventEmitter.emit(AuthEvents.SIGNUP, validatedInstance);

            // // Setting User Session
            // setClientSession(session, new ClientSession({
            //     roles: validatedInstance.roles,
            //     email: validatedInstance.email,
            //     orgname: validatedInstance.orgname,
            //     visits: 1,
            //     id: savedUser.id
            // }));

            // Send greeting message or redirect user to the application dashboard.
            // return message('Welcome!')