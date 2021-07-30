import { PartialType } from '@nestjs/swagger';
import { CreateClientauthDTO } from './create-clientauth.dto';

export class UpdateClientauthDto extends PartialType(CreateClientauthDTO) { }
