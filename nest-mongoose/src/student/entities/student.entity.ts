import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Student {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ required: true, unique: true })
  studentId: string;

  @Prop({ required: true }) // 去掉 unique: true
  classId: string;

  @Prop({ required: true })
  schoolId: string;

  @Prop({ type: String, required: true })
  sex: string;

  @Prop({ type: String, required: true })
  departmentId: string; //学院id

  @Prop({ type: String, required: true })
  majorId: string; //专业id
}

// 注释：HydratedDocument 是 mongoose 提供的类型，用来描述文档。
export type StudentDocument = HydratedDocument<Student>;

export const StudentSchema = SchemaFactory.createForClass(Student);
