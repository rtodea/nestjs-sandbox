import { Test, TestingModule } from '@nestjs/testing';
import { MostCommonWordService } from './most-common-word.service';

describe('MostCommonWordService', () => {
  let mostCommonWord: MostCommonWordService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [MostCommonWordService],
    }).compile();

    mostCommonWord = app.get<MostCommonWordService>(MostCommonWordService);
  });
  it('should be truthy', () => {
    expect(mostCommonWord).toBeTruthy();
  });

  const doTest = (index: number, input: string, expectedOutput: string[]) => {
    it(`${index} should return ${input}`, () => {
      expect(mostCommonWord.top3Words(input)).toEqual(expectedOutput);
    });
  };

  doTest(1, 'a a a  b  c c  d d d d  e e e e e', ['e', 'd', 'a']);
  doTest(2, 'a a a c b b', ['a', 'b', 'c']);
  doTest(3, 'e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e', [
    'e',
    'ddd',
    'aa',
  ]);
  doTest(4, "  //wont won't won't ", ["won't", 'wont']);
  doTest(5, '  , e   .. ', ['e']);
  doTest(6, '  ...  ', []);
  doTest(7, "  '  ", []);
  doTest(
    8,
    `In a village of La Mancha, the name of which I have no desire to call to
 mind, there lived not long since one of those gentlemen that keep a lance
 in the lance-rack, an old buckler, a lean hack, and a greyhound for
 coursing. An olla of rather more beef than mutton, a salad on most
 nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
 on Sundays, made away with three-quarters of his income.`,
    ['a', 'of', 'on'],
  );
});
