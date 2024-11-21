import { Injectable } from '@nestjs/common';
import { CreateStudent2Dto } from './dto/create-student2.dto';
import { UpdateStudent2Dto } from './dto/update-student2.dto';

@Injectable()
export class Student2Service {
  create(createStudent2Dto: CreateStudent2Dto) {
    return 'This action adds a new student2';
  }

  findAll() {
    return `This action returns all student2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student2`;
  }

  update(id: number, updateStudent2Dto: UpdateStudent2Dto) {
    return `This action updates a #${id} student2`;
  }

  remove(id: number) {
    return `This action removes a #${id} student2`;
  }
}
