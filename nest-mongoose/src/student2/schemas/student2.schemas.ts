import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 定义 Student 文档模型，该模型将用于存储学生信息
@Schema()
export class Student extends Document {
  // 性别字段，必填
  @Prop({ required: true })
  sex: string;

  // 中文名字段，必填
  @Prop({ required: true })
  chineseName: string;

  // 英文名字段，必填
  @Prop({ required: true })
  englishName: string;

  // 身份证字段，必填且唯一，用于标识每个学生的唯一身份
  @Prop({ required: true, unique: true })
  idCard: string;

  // 学号字段，必填且唯一，用于标识每个学生的学号
  @Prop({ required: true, unique: true })
  studentId: string;

  // 班级字段，必填，用于标识学生所在的班级
  @Prop({ required: true })
  classId: string;

  // 专业字段，必填，用于标识学生所学的专业
  @Prop({ required: true })
  major: string;

  // 学院字段，必填，用于标识学生所属的学院
  @Prop({ required: true })
  department: string;

  // 学校字段，必填，用于标识学生所在的学校
  @Prop({ required: true })
  school: string;

  // 学科字段，必填，用于标识学生所属的学科
  @Prop({ required: true })
  subject: string;

  // 出生日期字段，必填，用于记录学生的出生日期
  @Prop({ required: true })
  birthDate: Date;

  // 年龄字段，非必填，可以根据 birthDate 动态计算或存储
  @Prop({ required: false })
  age: number;

  // 入学年份字段，非必填，用于记录学生入学的年份
  @Prop({ required: false })
  enrollmentYear: number;

  // 联系电话字段，非必填，用于记录学生的联系电话
  @Prop({ required: false })
  contactNumber: string;

  // 邮箱字段，非必填，用于记录学生的电子邮箱
  @Prop({ required: false })
  email: string;
}

// 创建并导出 Student 模型的 Mongoose 架构
export const StudentSchema = SchemaFactory.createForClass(Student);
