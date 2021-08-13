import { snakeCase } from 'lodash';
import { ShortMessage } from './auth-mailler.service';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import {
    Inject,
    Injectable,
    NotFoundException,
    NotAcceptableException,
    NotImplementedException,
    InternalServerErrorException,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { DatabaseService, DatabaseTokens } from '../database';
import { LoginForm, SignupForm, ForgotPasswordForm } from './forms';
import { SubscriberEntity } from 'apps/api/src/models/user';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';

const VerificationCodes: Record<string, string> = {};

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(SubscriberEntity) private readonly userRepo: Repository<SubscriberEntity>,
        @Inject(DatabaseTokens.CLIENT_REPOSITORY)
        private readonly clientRepo: Repository<SubscriberEntity>,
        private emitter: EventEmitter2,
        private readonly databaseService: DatabaseService,
    ) {}

    async join(form: SignupForm): Promise<any> {
        const instance = this.clientRepo.create(form as any);
        instance.toString();
        const saved: any = await this.clientRepo.save(instance);
        await this.clientRepo.update(saved.id, { string: saved.toString() } as any);
        return saved;
    }

    async login(form: LoginForm, session: SessionData, orgname: string): Promise<any> {
        let found: SubscriberEntity;
        try {
            found = await this.clientRepo?.findOneOrFail({ where: { email: form.email } })!;
        } catch (err) {
            throw new NotFoundException('Account not found!');
        }

        try {
            await compare(form.password!, found.password!);
        } catch (err) {
            throw new NotAcceptableException('Wrong password');
        }

        this.emitter.emit('auth.login', found);

        return { message: 'welcome back' };
    }

    async signup(form: SignupForm, session: SessionData): Promise<any> {
        const { email, orgname } = form;

        const databaseName = 'client_' + snakeCase(form.orgname);
        try {
            await this.databaseService?.createDBFromTemplate(databaseName);
        } catch (err) {
            throw new InternalServerErrorException(
                'We could not crete your database! Please try to simplify the organization name',
            );
        }

        try {
            const created = await this.userRepo?.save({
                ...form,
                database: databaseName,
                permissions: 'client',
            });
            const found = await this.userRepo.findOne({ orgname });

            this.emitter.emit('auth.signup', found);

            (session as any).user = found;
            return { message: 'Welcome to Authdare' };
        } catch (err) {
            throw new NotAcceptableException('The account already exists!');
        }
    }

    async forgotPassword(form: ForgotPasswordForm, session: SessionData): Promise<any> {
        const found = await this.clientRepo?.findOneOrFail({ where: { email: form.email } })!;

        if (form.code && form.email) {
            if (VerificationCodes[form.email] && VerificationCodes[form.email] == form.code) {
                const newPassword = v4();

                await this.clientRepo?.update(found.id!, { password: newPassword });
                this.emitter.emit('auth.password-reset', {
                    email: form.email,
                    title: 'New Password',
                    message: newPassword,
                });

                delete VerificationCodes[form.email];

                return { message: 'Please checkout inbox.' };
            } else {
                throw new NotAcceptableException('Code is invalid');
            }
        } else if (form.email) {
            const code = v4();
            VerificationCodes[form.email] = code;

            this.emitter.emit('auth.password-reset', {
                email: form.email,
                title: 'Verification Code',
                message: code,
            } as ShortMessage);
            return { message: 'Please check your inbox.' };
        }
        return 'forgotPasswordHandler';
    }
    async requestOneTimeLoginCode(email: string): Promise<any> {
        throw new NotImplementedException();
    }

    async updateProfile(id: number, updated: Partial<SubscriberEntity>): Promise<any> {
        return await this.clientRepo.update(id, updated);
    }
}
