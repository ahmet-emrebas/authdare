import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';

export const I18nModule$ = I18nModule.forRoot({
  parserOptions: {
    path: join(process.cwd(), 'i18n'),
    watch: true,
  },
  resolvers: [
    new HeaderResolver(['x-custom-lang']),
    AcceptLanguageResolver,
    new CookieResolver(['lang', 'locale', 'l']),
    { use: QueryResolver, options: ['lang', 'locale', 'l'] },
  ],
  fallbackLanguage: 'en',
  parser: I18nJsonParser,
});
