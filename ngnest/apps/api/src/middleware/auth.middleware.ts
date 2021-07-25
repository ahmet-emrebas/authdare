import { CookieEnum } from '../common/cookie.enum';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import {
    User, CreateUserDto, UpdateUserDto,
    Organization, CreateOrganizationDto, UpdateOrganizationDto,
    Profile, CreateProfileDto, UpdateProfileDto,
    Photo, CreatePhotoDto, UpdatePhotoDto,
    Role, CreateRoleDto, UpdateRoleDto,
    Permission, CreatePermissionDto, UpdatePermissionDto,
    Project, CreateProjectDto, UpdateProjectDto,
    Sprint, CreateSprintDto, UpdateSprintDto,
    Tag, CreateTagDto, UpdateTagDto,
    Blog, CreateBlogDto, UpdateBlogDto,
    BlogContent, CreateBlogContentDto, UpdateBlogContentDto,
    Category, CreateCategoryDto, UpdateCategoryDto,
    Product, CreateProductDto, UpdateProductDto,
    Ticket, CreateTicketDto, UpdateTicketDto,
} from '@authdare/models';
import { getResourceService } from '../common/get-resource-service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) { }
    async use(req: Request, res: Response, next: () => void) {

        const loginCookie =
            req.cookies[CookieEnum.LOGIN_COOKIE] ||
            req.query[CookieEnum.LOGIN_COOKIE];
        try {
            const authUser = await this.jwt.verify(loginCookie);
            req['user'] = authUser;
        } catch (err) {
            req['user'] = null;
        }

        const params = req.params[0].split('/');
        const orgname = params[0];
        const resource = params[2];
        const services = {
            usersService: async () => await getResourceService(orgname, User, CreateUserDto, UpdateUserDto),
            organizationsService: async () => await getResourceService(orgname, Organization, CreateOrganizationDto, UpdateOrganizationDto),
            profilesService: async () => await getResourceService(orgname, Profile, CreateProfileDto, UpdateProfileDto),
            photosService: async () => await getResourceService(orgname, Photo, CreatePhotoDto, UpdatePhotoDto),
            rolesService: async () => await getResourceService(orgname, Role, CreateRoleDto, UpdateRoleDto),
            permissionsService: async () => await getResourceService(orgname, Permission, CreatePermissionDto, UpdatePermissionDto),
            projectsService: async () => await getResourceService(orgname, Project, CreateProjectDto, UpdateProjectDto),
            sprintsService: async () => await getResourceService(orgname, Sprint, CreateSprintDto, UpdateSprintDto),
            tagsService: async () => await getResourceService(orgname, Tag, CreateTagDto, UpdateTagDto),
            blogsService: async () => await getResourceService(orgname, Blog, CreateBlogDto, UpdateBlogDto),
            blogcontentsService: async () => await getResourceService(orgname, BlogContent, CreateBlogContentDto, UpdateBlogContentDto),
            categorysService: async () => await getResourceService(orgname, Category, CreateCategoryDto, UpdateCategoryDto),
            productsService: async () => await getResourceService(orgname, Product, CreateProductDto, UpdateProductDto),
            ticketsService: async () => await getResourceService(orgname, Ticket, CreateTicketDto, UpdateTicketDto),
        }

        req['ResourceService'] = services[resource + 'Service']();
        next();
    }
}
