import { Module } from '@nestjs/common';
import { Student2Service } from './student2.service';
import { Student2Controller } from './student2.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student2.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [Student2Controller],
  providers: [Student2Service],
})
export class Student2Module {}
