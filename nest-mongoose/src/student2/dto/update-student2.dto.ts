import { PartialType } from '@nestjs/swagger';
import { CreateStudent2Dto } from './create-student2.dto';

export class UpdateStudent2Dto extends PartialType(CreateStudent2Dto) {}
