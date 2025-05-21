import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  async getUsers(@CurrentUser() user: User) {
    
    console.log(user);

    return this.usersService.getAllUsers();
  }
}
