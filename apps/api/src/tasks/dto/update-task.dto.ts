import { IsEnum, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class UpdateTaskDto {
  @IsString() @MinLength(1) @IsOptional() title?: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() category?: string;
  @IsEnum(['TODO','IN_PROGRESS','DONE'] as any) @IsOptional()
  status?: TaskStatus;
  @IsInt() @IsOptional() assigneeId?: number;
}
