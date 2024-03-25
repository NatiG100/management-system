import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from 'src/types/apiFeatures';
import { Department } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}
  async departmentCount(): Promise<number> {
    return this.prisma.department.count();
  }
  async create(
    { parentId, ...departmentInfo }: CreateDepartmentDto,
    creatorId: string,
  ): Promise<Message<Department>> {
    const createdDepartment = await this.prisma.department.create({
      data: {
        ...departmentInfo,
        creatorId,
        ...(parentId && {
          relationsAsAChild: { create: { parentId: parentId } },
        }),
      },
    });
    return {
      data: createdDepartment,
      message: 'Created a department successfully',
    };
  }

  async findAll(): Promise<Message<Department[]>> {
    const allDepartments = await this.prisma.department.findMany({
      include: { relationsAsAChild: true, relationsAsAParent: true },
    });
    return {
      data: allDepartments,
      message: 'List of all departments',
    };
  }

  async findOne(id: string): Promise<Message<Department>> {
    const department = await this.prisma.department.findUnique({
      where: { id: id },
      include: { relationsAsAChild: true, relationsAsAParent: true },
    });
    return {
      data: department,
      message: 'Fetched department',
    };
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Message<Department>> {
    const updatedDepartment = await this.prisma.department.update({
      where: { id: id },
      data: updateDepartmentDto,
    });
    return {
      data: updatedDepartment,
      message: `Updated the department with an id of ${id}`,
    };
  }

  async remove(id: string): Promise<Partial<Message<undefined>>> {
    await this.prisma.department.delete({ where: { id } });
    return {
      message: `Deleted the department with  an id of ${id}`,
    };
  }
}
