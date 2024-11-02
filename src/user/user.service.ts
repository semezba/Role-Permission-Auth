import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll = async () => {
    try {
      const usersWithRoles = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          UserRole: {
            select: {
              role: {
                select: {
                  name: true,
                  is_active: true,
                  RolePermission: {
                    select: {
                      permission: {
                        select: {
                          title: true,
                          permission_type: true,
                        },
                      },
                      is_active: true,
                    },
                  },
                },
              },
              is_active: true,
            },
          },
        },
      });
      return usersWithRoles;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
