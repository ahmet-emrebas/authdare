import { Exclude, Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { CommonConstructor } from '../base';
import { t } from '../type';

@Exclude()
export class UserDetails extends CommonConstructor<UserDetails> {
    @Expose()
    @IsString()
    @IsOptional()
    firstName: string = t<string>();

    @Expose()
    @IsString()
    @IsOptional()
    lastName: string = t<string>();

    @Expose()
    @IsString()
    @IsOptional()
    email: string = t<string>();

    @Expose()
    @IsString()
    @IsOptional()
    password: string = t<string>();

    @Expose()
    @IsString()
    @IsOptional()
    phone: string = t<string>();

    @Expose()
    @IsString()
    @IsOptional()
    orgname: string = t<string>();
}
