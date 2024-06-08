import { Gender } from '../entities/employee.entity';
export declare class CreateEmployeeDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    gender: Gender;
    home_address: string;
    description: string;
    birthday_date: Date;
}
