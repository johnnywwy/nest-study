import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  @InjectModel(Student.name)
  private readonly studentModel: Model<Student>;

  create(createStudentDto: CreateStudentDto) {
    const student = new this.studentModel(createStudentDto);
    return student.save();
  }

  // 批量创建学生信息
  createMany(studentList: CreateStudentDto[]) {
    return this.studentModel.insertMany(studentList);
  }

  findAll() {
    const students = this.studentModel.find();
    return students;
  }

  findOne(id: string) {
    const student = this.studentModel.findById(id);
    return student;
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = this.studentModel.findByIdAndUpdate(id, updateStudentDto);
    return student;
  }

  remove(id: string) {
    const student = this.studentModel.findByIdAndDelete(id);
    return student;
  }

  // 删除所有学生信息
  removeAllStudent(): Promise<any> {
    const student = this.studentModel.deleteMany();
    return student;
  }

  // 根绝学校id 对学生信息进行分组
  // getStudentCountBySchool(schoolId?: string) {
  //   const pipeline = [];

  //   console.log('schoolId', schoolId);

  //   // 如果传入了 schoolId，添加 $match 阶段进行过滤
  //   if (schoolId) {
  //     pipeline.push({
  //       $match: { schoolId: schoolId },
  //     });
  //   }

  //   // 按 schoolId 分组，统计每个学校的学生数量
  //   pipeline.push(
  //     // 第一个管道阶段：使用 $group 操作符按 schoolId 分组
  //     {
  //       $group: {
  //         _id: '$schoolId', // 将每个 schoolId 作为一个组，每个 schoolId 作为组的唯一标识符 (_id)
  //         studentCount: { $sum: 1 }, // 使用 $sum 对每组中的文档进行计数，每个文档加 1，得到每个 schoolId 的学生总数
  //       },
  //     },
  //     // 第二个管道阶段：使用 $project 操作符来格式化输出结果
  //     {
  //       $project: {
  //         _id: 0, // 不包含默认的 _id 字段（因为它是 schoolId，现在我们改为另一个字段名）
  //         schoolId哈哈哈: '$_id', // 将 _id 字段重命名为 schoolId，方便阅读和理解
  //         studentCount: 1, // 保留 studentCount 字段，表示每个 schoolId 下的学生总数
  //       },
  //     },
  //   );

  //   return this.studentModel.aggregate(pipeline);
  // }

  // 根据学校 id 对班级进行分组
  getStudentCountBySchool(schoolId?: string) {
    const pipeline = [];

    // 如果传入了 schoolId，添加 $match 阶段进行过滤
    if (schoolId) {
      pipeline.push({
        $match: { schoolId: schoolId },
      });
    }

    // 按 schoolId 分组，收集每个学校的班级列表
    pipeline.push(
      {
        $group: {
          _id: '$schoolId', // 以 schoolId 为分组键
          classList: { $addToSet: '$classId' }, // 将 classId 添加到 classList 数组中
        },
      },
      {
        $project: {
          _id: 0,
          schoolId: '$_id', // 将 _id 重命名为 schoolId
          classList: 1, // 仅返回 classList
        },
      },
    );

    return this.studentModel.aggregate(pipeline);
  }
}
