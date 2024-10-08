import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { RequireLogin, RequirePermission, UserInfo } from './custom.decorator';

@ApiTags('app 模块')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @RequireLogin()
  @RequirePermission('ddd')
  aaa(@UserInfo('username') username: string, @UserInfo() userInfo) {
    console.log('username', username);
    console.log('userInfo', userInfo);

    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
