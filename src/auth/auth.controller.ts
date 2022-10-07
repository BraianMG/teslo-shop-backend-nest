import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';
import { GetUser, GetRawHeaders } from './decorators/';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request: Express.Request
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRawHeaders() rawHeaders: string[], // Igual que el siguiente pero para practicar
    @Headers() headers: IncomingHttpHeaders, // Nos lo da Nest
  ) {
    console.log({ user, rawHeaders });
    return {
      ok: true,
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }
}
