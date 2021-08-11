import { ConfigService } from '@nestjs/config';
import { modules } from './modules';
import { Controller, Get, Inject, Param, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Controller({
    scope: Scope.DEFAULT,
})
export class MainController {
    constructor(
        @Inject(REQUEST) private readonly req: Request,
        private config: ConfigService,
    ) {}
    @Get('config/:module')
    modules(@Param('module') module: string) {
        return this.config.get(module);
    }
}
