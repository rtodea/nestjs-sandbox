import { Injectable } from '@nestjs/common';
import {
  compose,
  countBy,
  filter,
  identity,
  map,
  sortBy,
  split,
  take,
  toPairs,
} from 'ramda';

@Injectable()
/**
 * Write a function that, given a string of text (possibly with punctuation
 * and line-breaks), returns an array of the top-3 most occurring words,
 * in descending order of the number of occurrences.
 *
 * Assumptions:
 *
 * 1. A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
 * 2. Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
 * 3. Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
 * 4. Matches should be case-insensitive, and the words in the result should be lowercased.
 * 5. Ties may be broken arbitrarily.
 * 6. If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.
 *
 * Examples:
 *
 * "In a village of La Mancha, the name of which I have no desire to call to
 * mind, there lived not long since one of those gentlemen that keep a lance
 * in the lance-rack, an old buckler, a lean hack, and a greyhound for
 * coursing. An olla of rather more beef than mutton, a salad on most
 * nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
 * on Sundays, made away with three-quarters of his income."
 *
 * --> ["a", "of", "on"]
 *
 *
 * "e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"
 *
 * --> ["e", "ddd", "aa"]
 *
 *
 * "  //wont won't won't"
 *
 * --> ["won't", "wont"]
 *
 * Bonus points (not really, but just for fun):
 * ============================================
 *
 * Avoid creating an array whose memory footprint is roughly as big as the input text.
 * Avoid sorting the entire array of unique words.
 */
export class MostCommonWordService {
  top3Words(text: string): string[] {
    const cleanWord = (word: string): string =>
      word.toLowerCase().replace(/[^a-zA-Z']/g, '');
    const validWord = (word: string): boolean => Boolean(word && word !== `'`);
    // const log = (x: unknown) => console.log(x);

    const sortedWords = compose(
      take(3),
      map(([word]: [string, number]) => word),
      sortBy(([, count]: [string, number]) => -count),
      toPairs,
      countBy(identity<string>),
      filter(validWord),
      map(cleanWord),
      split(' '),
    );

    return sortedWords(text) as string[];
  }
}
