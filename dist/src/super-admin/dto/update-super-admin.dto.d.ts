import { CreateSuperAdminDto } from './create-super-admin.dto';
declare const UpdateSuperAdminDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSuperAdminDto>>;
export declare class UpdateSuperAdminDto extends UpdateSuperAdminDto_base {
}
export declare class ActivateJobDto {
    job_id: number;
}
export {};
