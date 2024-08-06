import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {
  }

  async create(createExamDto: CreateExamDto) {
    const subcategoryId = createExamDto.subcategoryId;
    const subcategory = await this.subCategoryRepository.findOne({ where: { id: subcategoryId } });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory ${subcategoryId} not found`);
    }
    const exam = this.examRepository.create({
      subCategory: subcategory,
      question: createExamDto.question,
      a: createExamDto.a,
      b: createExamDto.b,
      c: createExamDto.c,
      d: createExamDto.d,
      answer: createExamDto.answer,
    });

    return this.examRepository.save(exam);
  }

  async findAll(fields?: any) {
    return await this.examRepository.find({where:  fields ,relations:['subCategory']});
  }

  async findOne(id: number) {
    return await this.examRepository.find({where: { id: id },relations:['subCategory']});
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    const exam = await this.examRepository.findOne({where: { id: id }});
    if (!exam) {
      throw new NotFoundException(`Exam with id ${id} not found`);
    }

    delete updateExamDto.subcategoryId;

    await this.examRepository.update(id,updateExamDto);

    return await this.examRepository.findOne({where: { id: id }});
  }

 async remove(id: number) {
    const exam = await this.examRepository.findOne({where: { id: id }});
    if (!exam)
      throw new NotFoundException(`Exam with id ${id} not found`);

    await this.examRepository.remove(exam);
    return 'deleted successfully'
  }
}
