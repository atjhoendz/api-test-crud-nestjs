import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { IResponse } from '../response.interface';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDTO): Promise<IResponse> {
    const result = await this.userService.create(dto);

    return {
      statusCode: HttpStatus.CREATED,
      data: result,
      message: 'User created successfully',
    };
  }

  @Get()
  async findAll(): Promise<IResponse> {
    const result = await this.userService.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: result,
      message: 'Successfully get all user data',
    };
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IResponse> {
    const result = await this.userService.findById(id);

    return {
      statusCode: HttpStatus.OK,
      data: result,
      message: 'Successfully get a user data by id',
    };
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDTO,
  ): Promise<IResponse> {
    const result = await this.userService.update(id, dto);

    return {
      statusCode: HttpStatus.OK,
      data: result,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IResponse> {
    const result = await this.userService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      data: result,
      message: 'User removed successfully',
    };
  }
}
