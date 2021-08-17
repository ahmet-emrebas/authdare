import { SessionData } from 'express-session';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Scope, Body, Param, ParseIntPipe, Query, Session } from '@nestjs/common';
import { SignupService } from './signup.service';
import {
    DeleteRoute,
    FindRoute,
    QueryRoute,
    SaveRoute,
    UpdateRoute,
} from '@authdare/common/openapi';
import { SignupEntity } from './signup.entity';

@ApiTags(SignupController.name)
@Controller({
    path: 'signup',
    scope: Scope.DEFAULT,
})
export class SignupController {
    constructor(private readonly service: SignupService) {}

    @QueryRoute()
    async query(@Param('query') query: string, @Param() p: any, @Query() q: any) {
        return await this.service.query(query);
    }

    @FindRoute()
    async find(@Query() query: Record<string, any>, @Param() p: any, @Query() q: any) {
        return await this.service.find(query);
    }

    /**
     * Sign up or create subscription.
     * @param body
     */
    @SaveRoute()
    async save(@Body() body: SignupEntity, @Session() session: SessionData) {
        return await this.service.save(body as any);
    }

    @UpdateRoute()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updated: SignupEntity,
        @Param() p: any,
        @Query() q: any,
    ) {
        return await this.service.update(id, updated as any);
    }

    @DeleteRoute()
    async delete(@Param('id', ParseIntPipe) id: number, @Param() p: any, @Query() q: any) {
        return await this.service.delete(id);
    }
}
