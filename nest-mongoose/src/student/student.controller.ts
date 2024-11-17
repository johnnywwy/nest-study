import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('学生管理')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: '创建学生信息' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: '批量创建学生信息' })
  @Post('createMany')
  createMany(@Body() students: CreateStudentDto[]) {
    return this.studentService.createMany(students);
  }

  @ApiOperation({ summary: '根据学校id 对学生信息进行分组' })
  @Get('getStudentCountBySchool')
  searchStudentCountBySchool(@Query('schoolId') schoolId?: string) {
    console.log('-----', schoolId);
    // return '123456';
    return this.studentService.getStudentCountBySchool(schoolId);
  }

  @ApiOperation({ summary: '查询所有学生信息' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: '根据id查询学生信息' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @ApiOperation({ summary: '根据id修改学生信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: '删除所有学生信息' })
  @Delete('removeAllStudent')
  removeMany() {
    return this.studentService.removeAllStudent();
  }

  @ApiOperation({ summary: '根据id删除学生信息' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
