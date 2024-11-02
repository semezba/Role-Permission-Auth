import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AssignPermissionDTO,
  AssignRoleDTO,
  CreateUserDto,
  LogInDto,
  PermissionDto,
  RoleDTO,
} from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('Authorization and Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Public()
  @Post('register/new')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }

  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LogInDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @ApiOperation({ summary: 'Create a new role' })
  @Post('role')
  async createRole(@Body() body: RoleDTO) {
    return await this.authService.createRole(body);
  }

  @Public()
  @ApiOperation({ summary: 'Create a new permission' })
  @Post('permission')
  async createPermission(@Body() body: PermissionDto) {
    return await this.authService.createPermission(body);
  }

  @Public()
  @ApiOperation({ summary: 'Assign role' })
  @Post('role/assign')
  async assignRole(@Body() body: AssignRoleDTO) {
    return await this.authService.assignRole(body);
  }

  @Public()
  @ApiOperation({ summary: 'Assign permission' })
  @Post('permission/assign')
  async assignPermission(@Body() body: AssignPermissionDTO) {
    return await this.authService.assignPermission(body);
  }
}
