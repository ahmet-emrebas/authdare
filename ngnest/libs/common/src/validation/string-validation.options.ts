import { IsNumber, IsString } from 'class-validator';

export class StringValidationOptions {
    @IsNumber() min = 0;
    @IsNumber() max = 2000;
    @IsString() notContains = 'NoBadWordsPlease';
    @IsString() contains = '';
    @IsString() startWith = '';
    @IsString() endWith = '';
}
