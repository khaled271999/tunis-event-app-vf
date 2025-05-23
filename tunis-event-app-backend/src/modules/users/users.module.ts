import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [ProfileController],
  providers: [JwtStrategy],
})
export class UsersModule {}
