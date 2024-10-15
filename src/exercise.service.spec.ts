import { ExerciseService } from './exercise.service';

describe('ExerciseService', () => {
  let service: ExerciseService;
  beforeEach(() => {
    service = new ExerciseService();
  });

  it('should return a reversed version', () => {
    const initialArray = [1, 2, 3, 4];
    service.reverse(initialArray);
    expect(initialArray).toEqual([4, 3, 2, 1]);
  });

  it('should return a reversed version with odd numbers', () => {
    const initialArray = [1, 2, 3, 4, 5];
    service.reverse(initialArray);
    expect(initialArray).toEqual([5, 4, 3, 2, 1]);
  });
});
