import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from './dto/UserDto'; // ✅ Corrigé : import correct

// Typage personnalisé pour req.user injecté par le JwtAuthGuard
interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; role: Role };
}

@ApiTags('Users')
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

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserDto })
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.userId, dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserDto })
  getCurrentUser(@Req() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.userId); // ✅ ici
  }
}
