import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async CreateNewUser(@Body() createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.FullName) {
        return { message: 'Thông tin người dùng không hợp lệ' };
      }
      const newUser = await this.usersService.CreateNewUser(createUserDto);
      return { message: 'Tạo người dùng thành công', newUser };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tạo người dùng',
        error: error.message,
      };
    }
  }
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Response() res) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
    const token = await this.authService.generateJwtToken(user);
    return res.json({ token, user });
  }
  @Get()
  async GetAllUser() {
    try {
      const userList = await this.usersService.GetAllUser();
      if (userList.length === 0) {
        return {
          message: 'Không có người dùng nào trong danh sách',
          userList,
        };
      }
      return { message: 'Danh sách người dùng', userList };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy danh sách người dùng',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async GetUserById(@Param('id') id: string) {
    try {
      const userById = await this.usersService.GetUserById(+id);
      if (!userById) {
        return { message: 'Người dùng không tồn tại', userById };
      }
      return { message: 'Người dùng được tìm thấy', userById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi lấy thông tin người dùng',
        error: error.message,
      };
    }
  }

  @Get('search')
  async GetUserByKeyWord(@Param() searchParams: Partial<User>) {
    try {
      const userById = await this.usersService.GetUserById(+searchParams);
      if (!userById) {
        return { message: 'Người dùng không tồn tại', userById };
      }
      return { message: 'Người dùng được tìm thấy', userById };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi tìm kiếm người dùng',
        error: error.message,
      };
    }
  }

  @Patch('update/:id')
  async UpdateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.usersService.UpdateUserById(+id, updateUserDto);
      return { message: 'Cập nhật người dùng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi cập nhật người dùng',
        error: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async DeleteNewUserById(@Param('id') id: string) {
    try {
      await this.usersService.DeleteNewUserById(+id);
      return { message: 'Xóa người dùng thành công' };
    } catch (error) {
      return {
        message: 'Có lỗi xảy ra khi xóa người dùng',
        error: error.message,
      };
    }
  }
}
