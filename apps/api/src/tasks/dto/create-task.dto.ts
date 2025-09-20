import { IsEnum, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsString() @MinLength(1) title!: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() category?: string;
  @IsEnum(['TODO','IN_PROGRESS','DONE'] as any, { each: false })
  @IsOptional()
  status?: TaskStatus;
  @IsInt() @IsOptional() assigneeId?: number;
}
