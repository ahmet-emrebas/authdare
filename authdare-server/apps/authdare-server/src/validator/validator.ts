import { ClassConstructor } from 'class-transformer';

export function validateDto<CreateDTO, UpdateDTO>(
    method: 'GET' | 'POST' | 'PATCH' | 'UPDATE',
    createDTO: ClassConstructor<CreateDTO>,
    updateDTO: ClassConstructor<UpdateDTO>
) {


}