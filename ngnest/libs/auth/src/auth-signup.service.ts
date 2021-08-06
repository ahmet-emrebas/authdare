import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthUserService } from './auth-user.service';

import { CreateAuthUserDTO } from '@authdare/auth/sub';
import { SignupDTO } from './sub/dto/signup.dto';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Role, Permission } from './role';


@Injectable()
export class SignupService {
    private readonly logger = new Logger(SignupService.name);

    constructor(private authUserService: AuthUserService, private eventEmitter: EventEmitter2) { }

    async signup(user: SignupDTO) {
        const createdUser = await this.createNewSusbscription(user);
    }

    private async createNewSusbscription(user: SignupDTO) {

        const userRole = new Role({ name: 'admin', permissions: [new Permission({ method: 'all', resource: 'all' })] });
        const orgname = user.orgname;

        const isUserExist = await this.authUserService.isExist({ where: [{ orgname }, { email: user.email }] })

        if (isUserExist) {
            throw new BadRequestException("Account already exists!")
        }


        const { errors, validatedInstance } = await new CreateAuthUserDTO({ ...user, roles: [userRole] })
            .transformAndValidate()


        if (errors) {
            this.logger.error('Could not validate the user for some reason!', errors, validatedInstance);
            throw new InternalServerErrorException()
        }

        return await this.authUserService.create(validatedInstance);
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