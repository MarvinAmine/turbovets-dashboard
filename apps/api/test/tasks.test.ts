import { TasksService } from '../src/tasks/tasks.service';
import { Task } from '../src/tasks/task.entity';

describe('TasksService', () => {
  let tasks: TasksService;
  let repo: any;

  beforeEach(() => {
    repo = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      create: jest.fn((x) => x),
    };

    tasks = new TasksService(repo);
  });

  it('should list tasks for admin', async () => {
    repo.find.mockResolvedValue([{ id: 1, title: 'Test Task' }]);

    const res = await tasks.list(1, 1, ['ADMIN']);
    expect(res[0].title).toBe('Test Task');
  });

  it('should create a new task', async () => {
    repo.save.mockResolvedValue({ id: 1, title: 'New Task' });

    const res = await tasks.create(1, 1, { title: 'New Task' });
    expect(res.title).toBe('New Task');
  });
});
