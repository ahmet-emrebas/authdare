import { ResourceController } from "@authdare/resources";
import { Controller } from "@nestjs/common";


@Controller('api/:orgname/public/:resource')
export class AppBlogsController extends ResourceController<any> { }