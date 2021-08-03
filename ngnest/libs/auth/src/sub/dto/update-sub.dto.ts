import { CreateSubDTO } from './create-sub.dto';
import { PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Exclude()
export class UpdateSubDTO extends PartialType(CreateSubDTO) { }

