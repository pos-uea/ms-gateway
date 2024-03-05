import { Body, Controller, Delete, Get, Logger, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { ClientProxyRadioFrequency } from '../common/proxyrmq/client-proxy';
import { Observable } from 'rxjs';
import { hash} from 'bcryptjs';

@Controller('api/users')
export class UsersController {

  private logger = new Logger(UsersController.name)

  constructor(private clientProxyRadioFrequency: ClientProxyRadioFrequency) {}

  private dominioAdminUser = this.clientProxyRadioFrequency.getClientProxyAdminUserInstance()

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDto: createUserDto) {

    createUserDto.password = await hash(createUserDto.password, 12)
    this.logger.log(`createUserDto: ${JSON.stringify(createUserDto)}`)
    return  this.dominioAdminUser.emit('create-user', createUserDto);

    // return await this.dominioAdminUser.send('list-users', createUserDto.email).toPromise();
  }

  @Get()
  listUsers(
    @Query('email') email: string): Observable<any> {
    this.logger.log(`email: ${email}`)
    return this.dominioAdminUser.send('list-users', email ? email : '')
  }

  @Put()
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() createUserDto: createUserDto): Observable<any> {
    this.logger.log(`createUserDto: ${JSON.stringify(createUserDto)}`)
    return this.dominioAdminUser.emit('update-user', createUserDto)
  }

  @Delete()
  @UsePipes(ValidationPipe)
  deleteUser(
    @Query('email') email: string): Observable<any> {
    this.logger.log(`email: ${email}`)
    return this.dominioAdminUser.emit('delete-user', email)
  }

}
