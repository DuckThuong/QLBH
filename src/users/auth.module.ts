import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '28072003',
      signOptions: { expiresIn: '60s' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
