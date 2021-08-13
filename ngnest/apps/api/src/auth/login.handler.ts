// import { AuthActionHandlerArgument } from './../../../auth/src/auth.controller';
// import { AuthActionHandler } from 'apps/auth/src/auth.controller';
// import { compare } from 'bcrypt';
// import { UserEntity } from '@authdare/models/user';
// import { NotAcceptableException, NotFoundException } from '@nestjs/common';

// type LoginForm = {
//     email: string;
//     password: string;
// };

// export const loginHandler: AuthActionHandler = async ({
//     userRepository,
//     eventEmitter,
//     form,
//     session,
// }: AuthActionHandlerArgument<LoginForm>) => {
//     let found: UserEntity;
//     try {
//         found = await userRepository?.findOneOrFail({ where: { email: form.email } })!;
//     } catch (err) {
//         throw new NotFoundException('Account not found!');
//     }

//     try {
//         await compare(form.password, found.password!);
//     } catch (err) {
//         throw new NotAcceptableException('Wrong password');
//     }

//     session.user = found;

//     return { message: 'Welcome Back!' };
// };
