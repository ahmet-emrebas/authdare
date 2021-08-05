import { CreateAuthUserDTO } from './create-auth-user.dto';
import { PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Exclude()
export class UpdateAuthUserDTO extends PartialType(CreateAuthUserDTO) { }

