import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './entities/event.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Events) private readonly eventRepository: Repository<Events>,
  ) {
  }


  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create({
      event: createEventDto.eventName,
      date: createEventDto.eventDate,
    });

    return await this.eventRepository.save(event);

  }

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: number) {
    return await this.eventRepository.find({ where: { id: id } });
  }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  async remove(id: number) {
    const event = await this.eventRepository.findOne({ where: { id: id } });
     await this.eventRepository.remove(event);
     return 'event was deleted successfully'
  }
}
