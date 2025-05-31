import { Controller, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ enum: ['PARTICIPANT', 'ORGANISATEUR', 'SUPERADMIN'] })
  role!: 'PARTICIPANT' | 'ORGANISATEUR' | 'SUPERADMIN';
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserDto] })
  @Roles(Role.SUPERADMIN)
  findAll() {
    return this.usersService.findAll();
  }
  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
