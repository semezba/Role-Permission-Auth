import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    if (!roles && !permissions) {
      return false;
    }

    if (request?.user) {
      const { id } = request.user;

      // Fetch user roles and permissions from the database
      const user = await this.prisma.userRole.findFirst({
        where: { userId: id },
        select: {
          role: {
            select: {
              name: true,
              is_active: true,
              RolePermission: {
                where: { is_active: true },
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
        },
      });

      const userRole = user?.role?.name;
      const userPermissions = user?.role?.RolePermission.map(
        (p: any) => p.permission.title,
      );

      // Check if role and required permissions match
      const hasRole = roles.includes(userRole);
      const hasPermission = permissions.every((permission) =>
        userPermissions?.includes(permission),
      );

      return hasRole && hasPermission;
    }

    return false;
  }
}
