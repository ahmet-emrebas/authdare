import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

const [EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD] =
  process.env.AUTHDARE_EMAIL_CONFIG.split('###');

export const MailerModule$ = MailerModule.forRootAsync({
  useFactory: () => {
    console.log(EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD);
    return {
      transport: {
        name: EMAIL_HOST,
        host: EMAIL_HOST,
        port: 465, // 587(no ssl)
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: join(process.cwd(), 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  },
});
