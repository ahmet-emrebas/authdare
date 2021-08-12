import { DatabaseService } from './../../database/src/database.service';
import { GLOBAL_CONNECTION_TOKEN } from '@authdare/common/module';
import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from 'eventemitter2';
import {
    AuthActionHandler,
    AuthController,
    ForgotPasswordHandlerToken,
    LoginHandlerToken,
    SignupHandlerToken,
} from './auth.controller';

describe('AuthController', () => {
    let authController: AuthController;
    beforeEach(async () => {
        const handler: (value: string) => AuthActionHandler = (value) => (arg) => {
            return value;
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: ForgotPasswordHandlerToken,
                    useValue: handler(ForgotPasswordHandlerToken),
                },
                { provide: LoginHandlerToken, useValue: handler(LoginHandlerToken) },
                { provide: SignupHandlerToken, useValue: handler(SignupHandlerToken) },
                { provide: GLOBAL_CONNECTION_TOKEN, useValue: null },
                { provide: EventEmitter2, useValue: null },
                { provide: DatabaseService, useValue: null },
                { provide: 'UserEntityRepository', useValue: null },
            ],
        }).compile();

        authController = app.get<AuthController>(AuthController);
    });

    it('should login', async () => {
        expect(await authController.login()).toBe(LoginHandlerToken);
    });

    it('should signup', async () => {
        expect(await authController.signup()).toBe(SignupHandlerToken);
    });

    it('should forgot password', async () => {
        expect(await authController.forgotPassword()).toBe(ForgotPasswordHandlerToken);
    });
});
