import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    create(createJobDto: CreateJobDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateJobDto: UpdateJobDto): string;
    remove(id: string): string;
}
