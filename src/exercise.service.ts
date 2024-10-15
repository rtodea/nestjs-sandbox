import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseService {
  /**
   * 1, 2, 3, 4 -> 4, 3, 2, 1
   *
   * even or odd sized array
   * @param array
   */
  reverse(array: number[]): number[] {
    const middle = array.length / 2;
    for (let i: number = 0; i < middle; i++) {
      const mirrorIndex = array.length - i - 1;
      const box = array[i];
      array[i] = array[mirrorIndex];
      array[mirrorIndex] = box;
    }

    return array;
  }
}
