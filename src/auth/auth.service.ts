import { Injectable, Logger } from '@nestjs/common';
import {
  AssignPermissionDTO,
  AssignRoleDTO,
  CreateUserDto,
  PermissionDto,
  RoleDTO,
} from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
const bcrypt = require('bcryptjs');
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  createUser = async (body: CreateUserDto) => {
    try {
      const now = moment().format();
      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);
      const existUser = await this.prisma.user.findUnique({
        where: { email: body.email },
      });
      if (!existUser) {
        this.logger.log('Creating a new user...');
        const newUser = await this.prisma.user.create({
          data: {
            ...body,
            created_at: now,
            updated_at: now,
          },
        });
        this.logger.log('User Create Successfully');
        return {
          success: true,
          message: 'New user registered successfully',
          data: newUser,
        };
      } else {
        this.logger.warn('user already exist');
        return {
          success: false,
          message: 'user already exist.',
        };
      }
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  validateUser = async (email: string, password: string) => {
    try {
      const existUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existUser) {
        const passwordCheck = bcrypt.compareSync(password, existUser.password);
        if (passwordCheck) {
          return existUser;
        } else {
          return {
            success: false,
            message: 'User not found',
          };
        }
      } else {
        return {
          success: false,
          message: 'User not found',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  login = async (user: any) => {
    try {
      if (Object.keys(user).length !== 0) {
        const data = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        return {
          message: 'Login Successfully',
          success: true,
          data: {
            accessToken: this.jwtService.sign(data),
            data,
          },
        };
      } else {
        return {
          success: false,
          message: 'Login Unsuccessfull.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  verifyJwt = async (jwt: string) => {
    try {
      return this.jwtService.verify(jwt);
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  };

  createRole = async (body: RoleDTO) => {
    try {
      const now = moment().format();
      const data = await this.prisma.role.create({
        data: {
          name: body.name.toLowerCase().replace(/ /g, '_'),
          created_at: now,
          updated_at: now,
        },
      });
      return {
        success: true,
        message: 'create a new role',
        data,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  createPermission = async (body: PermissionDto) => {
    try {
      const now = moment().format();
      const data = await this.prisma.permission.create({
        data: {
          title: body.title.toLowerCase().replace(/ /g, '_'),
          permission_type: body.permission_type
            .toLowerCase()
            .replace(/ /g, '_'),
          created_at: now,
          updated_at: now,
        },
      });
      return {
        success: true,
        message: 'Create new Permission Successfully',
        data,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  assignRole = async (body: AssignRoleDTO) => {
    try {
      const now = moment().format();
      const data = await this.prisma.userRole.create({
        data: {
          userId: body.userId,
          roleId: body.roleId,
          created_at: now,
          updated_at: now,
        },
      });
      return {
        success: true,
        message: 'Assign a role for a user',
        data,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  assignPermission = async (body: AssignPermissionDTO) => {
    try {
      const now = moment().format();
      const data = await this.prisma.rolePermission.create({
        data: {
          permissionId: body.permissionId,
          roleId: body.roleId,
          created_at: now,
          updated_at: now,
        },
      });
      return {
        success: true,
        message: 'Assign permission for a role',
        data,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  };
}
