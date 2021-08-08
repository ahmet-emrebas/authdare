import { values } from 'lodash';
import { EmailService } from './email.service';
import { UserService } from './user.service';
import { SignupDTO, CreateUserDTO } from '../user';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { createPermissions } from '../create-permissions';
import { ProviderTokens } from '../provider-tokens';

@Injectable()
export class SignupService {
    private readonly logger = new Logger(SignupService.name);

    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService,
        @Inject(ProviderTokens.RESOURCE_PATHS) private readonly resourcePaths: string[],
    ) {}

    async signup(user: SignupDTO) {
        const createdUser = await this.createNewSusbscription(user);
        await this.emailService.greeting(user.email);
        return createdUser;
    }

    private async createNewSusbscription(user: SignupDTO) {
        const userPermissions = this.resourcePaths
            .map((e) => {
                return values(createPermissions(e));
            })
            .reduce((p, c) => [...p, ...c]);
        console.log(userPermissions);
        const orgname = user.orgname;

        const isUserExist = await this.userService.isExist({ where: [{ orgname }, { email: user.email }] });

        if (isUserExist) {
            throw new BadRequestException('Account already exists!');
        }

        return await this.userService.create(new CreateUserDTO({ ...user, permissions: userPermissions }));
    }
}
