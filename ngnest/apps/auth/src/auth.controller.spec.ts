import { Test, TestingModule } from '@nestjs/testing';
import {
    AuthController,
    ForgotPasswordHandler,
    ForgotPasswordHandlerToken,
    LoginHandler,
    LoginHandlerToken,
    SignupHandler,
    SignupHandlerToken,
} from './auth.controller';

describe('AuthController', () => {
    let authController: AuthController;
    beforeEach(async () => {
        const loginHandler: LoginHandler = (loginForm, session) => {
            return 'login';
        };
        const signupHandler: SignupHandler = (signupForm, session) => {
            return 'signup';
        };
        const forgotPasswordHandler: ForgotPasswordHandler = (form) => {
            return 'forgot';
        };
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: ForgotPasswordHandlerToken, useValue: forgotPasswordHandler },
                { provide: LoginHandlerToken, useValue: loginHandler },
                { provide: SignupHandlerToken, useValue: signupHandler },
            ],
        }).compile();

        authController = app.get<AuthController>(AuthController);
        // let authController = new AuthController(loginHandler, signupHandler, forgotPasswordHandler);
    });

    it('should login', async () => {
        expect(await authController.login(null, null)).toBe('login' as any);
    });

    it('should signup', async () => {
        expect(await authController.signup(null, null)).toBe('signup' as any);
    });

    it('should forgot password', async () => {
        expect(await authController.forgotPassword(null)).toBe('forgot' as any);
    });
});
