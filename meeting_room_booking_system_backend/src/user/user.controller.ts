import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserVo } from './vo/login-user.vo';
import { RefreshTokenVo } from './vo/refresh-token.vo';
import { ConfigService } from '@nestjs/config';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { UserDetailVo } from './vo/user-info.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@ApiTags('用户管理模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @ApiOperation({ summary: '获取验证码' }) // 这里描述接口的功能
  @ApiQuery({
    name: 'address',
    type: String,
    description: '邮箱地址',
    required: true,
    example: 'xxx@xx.com',
  })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: '发送成功',
  //   type: String,
  // })
  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<h2>你的注册验证码是 ${code}</h2>`,
    });

    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    return '发送成功';
  }

  @ApiOperation({ summary: '初始化数据' }) // 这里描述接口的功能
  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @ApiOperation({ summary: '用户注册' }) // 这里描述接口的功能
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    console.log(registerUser);

    return await this.userService.register(registerUser);
    // return 'success';
  }

  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, false);

    // console.log('用户', vo);

    vo.accessToken = this.createAccessToken(vo.userInfo);
    vo.refreshToken = this.createRefreshToken(vo.userInfo);

    // vo.accessToken = this.jwtService.sign(
    //   {
    //     userId: vo.userInfo.id,
    //     username: vo.userInfo.username,
    //     email: vo.userInfo.email,
    //     roles: vo.userInfo.roles,
    //     permissions: vo.userInfo.permissions,
    //   },
    //   {
    //     expiresIn:
    //       this.configService.get('jwt_access_token_expires_time') || '30m',
    //   },
    // );

    // vo.refreshToken = this.jwtService.sign(
    //   {
    //     userId: vo.userInfo.id,
    //   },
    //   {
    //     expiresIn:
    //       this.configService.get('jwt_refresh_token_expres_time') || '7d',
    //   },
    // );

    return vo;
  }

  @ApiOperation({ summary: '管理员登录' })
  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, true);
    // console.log('用户', vo);
    vo.accessToken = this.createAccessToken(vo.userInfo);
    vo.refreshToken = this.createRefreshToken(vo.userInfo);

    // vo.accessToken = this.jwtService.sign(
    //   {
    //     userId: vo.userInfo.id,
    //     username: vo.userInfo.username,
    //     email: vo.userInfo.email,
    //     roles: vo.userInfo.roles,
    //     permissions: vo.userInfo.permissions,
    //   },
    //   {
    //     expiresIn:
    //       this.configService.get('jwt_access_token_expires_time') || '30m',
    //   },
    // );

    // vo.refreshToken = this.jwtService.sign(
    //   {
    //     userId: vo.userInfo.id,
    //   },
    //   {
    //     expiresIn:
    //       this.configService.get('jwt_refresh_token_expres_time') || '7d',
    //   },
    // );
    return vo;
  }

  @ApiOperation({ summary: '刷新token' })
  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserById(data.userId, false);

      const access_token = this.createAccessToken(user);
      const refresh_token = this.createRefreshToken(user);
      // const access_token = this.jwtService.sign(
      //   {
      //     userId: user.id,
      //     username: user.username,
      //     email: user.email,
      //     roles: user.roles,
      //     permissions: user.permissions,
      //   },
      //   {
      //     expiresIn:
      //       this.configService.get('jwt_access_token_expires_time') || '30m',
      //   },
      // );

      // const refresh_token = this.jwtService.sign(
      //   {
      //     userId: user.id,
      //   },
      //   {
      //     expiresIn:
      //       this.configService.get('jwt_refresh_token_expres_time') || '7d',
      //   },
      // );

      const vo = new RefreshTokenVo();

      vo.access_token = access_token;
      vo.refresh_token = refresh_token;

      return vo;
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @ApiOperation({ summary: '管理员刷新token' })
  @Get('admin/refresh')
  async adminRefresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId, true);

      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          permissions: user.permissions,
        },
        {
          expiresIn:
            this.configService.get('jwt_access_token_expires_time') || '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn:
            this.configService.get('jwt_refresh_token_expres_time') || '7d',
        },
      );

      const vo = new RefreshTokenVo();

      vo.access_token = access_token;
      vo.refresh_token = refresh_token;

      return vo;
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @ApiOperation({ summary: '获取单个用户' })
  @Get('info')
  @RequireLogin()
  async info(@UserInfo('userId') userId: number) {
    const user = await this.userService.findUserDetailById(userId);
    const vo = new UserDetailVo();
    vo.id = user.id;
    vo.email = user.email;
    vo.username = user.username;
    vo.headPic = user.headPic;
    vo.phoneNumber = user.phoneNumber;
    vo.nickName = user.nickName;
    vo.createTime = user.createTime;
    vo.isFrozen = user.isFrozen;

    return vo;
  }

  @ApiOperation({ summary: '获取所有用户' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @ApiOperation({ summary: '获取单个用户' })
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // 修改密码
  @Post(['update_password', 'admin/update_password'])
  @RequireLogin()
  async updatePassword(
    @UserInfo('userId') userId: number,
    @Body() passwordDto: UpdateUserPasswordDto,
  ) {
    return await this.userService.updatePassword(userId, passwordDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // 生成refresh_token
  private createRefreshToken(user: any): string {
    return this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn:
          this.configService.get('jwt_refresh_token_expres_time') || '7d',
      },
    );
  }

  // 生成access_token
  private createAccessToken(user: any): string {
    return this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '30m',
      },
    );
  }
}
