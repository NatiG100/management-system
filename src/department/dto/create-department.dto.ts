import { IsOptional, IsString, MinLength } from 'class-validator';
export class CreateDepartmentDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  parentId: string;
}
