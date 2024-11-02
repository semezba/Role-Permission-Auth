import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsDate,
  IsMobilePhone,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  @IsString()
  avatar: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ example: '+1234567890' })
  @IsMobilePhone()
  mobile_number: string;

  @ApiProperty({ example: 'This is my bio' })
  @IsOptional()
  @IsString()
  bio: string;

  @ApiProperty({ example: 'Springfield High School' })
  @IsString()
  school_name: string;

  @ApiProperty({ example: 'school@example.com' })
  @IsEmail()
  school_email: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  stud_interface_lang: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  notification: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  darkmode: boolean;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDate()
  email_verified_at: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDate()
  join_date: Date;
}

export class LogInDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}

export class RoleDTO {
  @ApiProperty({ example: 'admin' })
  @IsString()
  name: string;
}

export class PermissionDto {
  @ApiProperty({ example: 'Profile photo upload' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Personal Management' })
  @IsString()
  permission_type: string;
}

export class AssignRoleDTO {
  @ApiProperty({ example: 4 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  roleId: number;
}

export class AssignPermissionDTO {
  @ApiProperty({ example: 2 })
  @IsNumber()
  permissionId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  roleId: number;
}
