import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CreateClientauthDTO } from './create-clientauth.dto';

export class CreateJoinClientauthDTO extends CreateClientauthDTO {

    @Exclude()
    @IsOptional()
    permissions;


    @Exclude()
    @IsOptional()
    status;

}