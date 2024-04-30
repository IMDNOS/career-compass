import { Employee } from '../../employees/entities/employee.entity';
import { Job } from '../../job/entities/job.entity';
export declare class SubCategory {
    id: number;
    name: string;
    employees: Employee[];
    jobs: Job[];
}
