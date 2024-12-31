import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.PasswordHash === password) {
      const { PasswordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async generateJwtToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
