import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Dog {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  tags: string[];
}

// 注释：HydratedDocument 是 mongoose 提供的类型，用来描述文档。
export type DogDocument = HydratedDocument<Dog>;

// 注释：SchemaFactory.createForClass 用来创建 Schema。这个方法会自动根据 Dog 类的属性生成 Schema。
export const DogSchema = SchemaFactory.createForClass(Dog);
