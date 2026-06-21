import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";


export const Role = (...roles:UserRole[]) => SetMetadata('roles',roles)