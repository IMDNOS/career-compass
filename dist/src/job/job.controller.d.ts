import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Request } from 'express';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    create(request: Request, createJobDto: CreateJobDto): Promise<import("./entities/job.entity").Job>;
}
