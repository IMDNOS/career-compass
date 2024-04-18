import { Gender } from "../entities/employee.entity";
export declare class CreateEmployeeDto {
    name: string;
    email: string;
    password: string;
    hashRT: string | null;
    resume: string;
    gender: Gender;
}
