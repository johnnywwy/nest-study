import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { Student2Module } from './student2/student2.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/guang'),
    StudentModule,
    Student2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
