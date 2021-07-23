import { CreateProfileDto } from './create-profile.dto';
import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Exclude()
export class UpdateProfileDto extends PartialType(CreateProfileDto) {

}