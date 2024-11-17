import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DogSchema } from './entities/dog.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Dog', schema: DogSchema }])],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
