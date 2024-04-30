import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobService {
    create(createJobDto: CreateJobDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateJobDto: UpdateJobDto): string;
    remove(id: number): string;
}
