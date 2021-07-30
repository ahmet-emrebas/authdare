import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from "@nestjs/common";
import { CreateAuthDTO } from './dto';

@ApiTags('Signup')
@Controller()
export class AuthSignupController {

    @Post('auth/signup')
    signup(@Body() createSignupDTO: CreateAuthDTO) { }
}