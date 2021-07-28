import { Body, Controller, Post } from "@nestjs/common";
import { ForgotPasswordDto } from "./dto";

@Controller('auth')
export class ForgotPasswordController {

    @Post('forgotpassword')
    async forgotPassword(@Body() { contact, contactType }: ForgotPasswordDto) {
        if (contact == 'phone') {
            // Send SMS code 
        } else {
            // Send email
        }
    }


}