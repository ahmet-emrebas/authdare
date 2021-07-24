import { cloneDeep } from 'lodash';
import { CreateRoleDto, CreatePermissionDto } from './../../../libs/models/role/create-role.dto';
import { CreateBlogContentDto } from './../../../libs/models/blog/create-blog.dto';
import { CreatePhotoDto } from './../../../libs/models/photo/create-photo.dto';
import { CreateUserDto } from './../../../libs/models/user/create-user.dto';
import { CreateOrganizationDto } from './../../../libs/models/organization/create-organization.dto';

import { company, internet, phone, name, datatype } from "faker"
import supertest from 'supertest';


export function fakeOrg(): CreateOrganizationDto {
    return {
        organizationName: company.companyName()
    }
}

export function fakeUser(): CreateUserDto {
    return {
        email: internet.email(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        password: internet.password(),
        phone: phone.phoneNumber(),
        organization: {
            id: 912891832
        }
    }
}

export function fakePhoto(): CreatePhotoDto {
    return {
        position: datatype.number(4) + '',
        photo: internet.url()
    }
}

export function fakeBlogContent(): CreateBlogContentDto {
    return {
        title: '',
        content: "",
        order: 1,
        photos: [fakePhoto(), fakePhoto()],
        blog: { id: 1 }
    }
}


export function fakePermission(): CreatePermissionDto {
    return {
        label: 'Test permission',
        method: 'GET',
        resource: "users"
    }
}

export function fakeRole(): CreateRoleDto {
    return {
        roleName: 'admin',

        permissions: [{ id: 9129312 }, { id: 1241241 }]
    }
}

