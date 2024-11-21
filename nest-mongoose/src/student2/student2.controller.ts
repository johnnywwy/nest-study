import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Student2Service } from './student2.service';
import { CreateStudent2Dto } from './dto/create-student2.dto';
import { UpdateStudent2Dto } from './dto/update-student2.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('student2')
@Controller('student2')
export class Student2Controller {
  constructor(private readonly student2Service: Student2Service) {}

  @ApiOperation({ summary: '创建学生信息' })
  @Post()
  create(@Body() createStudent2Dto: CreateStudent2Dto) {
    return this.student2Service.create(createStudent2Dto);
  }

  @ApiOperation({ summary: '获取学生信息列表' })
  @Get()
  findAll() {
    return this.student2Service.findAll();
  }

  @ApiOperation({ summary: '通过id获取学生信息' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.student2Service.findOne(+id);
  }

  @ApiOperation({ summary: '更新学生信息' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudent2Dto: UpdateStudent2Dto,
  ) {
    return this.student2Service.update(+id, updateStudent2Dto);
  }

  @ApiOperation({ summary: '删除学生信息' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.student2Service.remove(+id);
  }
}
