import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

  private logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() body) {
    this.logger.log(`login: ${JSON.stringify(body)}`);
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get()
  protected() {
    return { name: 'ok' };
  }
}