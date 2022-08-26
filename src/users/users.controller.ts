import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':name')
  @HttpCode(HttpStatus.OK)
  findByUsername(@Param('name') name: string): Promise<User> {
    return this.usersService.findByUsername(name);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put('id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
