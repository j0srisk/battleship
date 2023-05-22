import { assert, describe, expect, it } from 'vitest'
import sum from './src/sum'

//test sum function from main.js
describe('sum', () => {
    it('should add two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('should add negative numbers', () => {
        expect(sum(-1, -2)).toBe(-3);
    });

    it('should return 0 when adding a number and its negative counterpart', () => {
        expect(sum(5, -5)).toBe(0);
    });

    it('should add floating point numbers', () => {
        expect(sum(1.5, 2.5)).toBe(4);
    });
    
    it('should return the number itself when adding 0', () => {
        expect(sum(5, 0)).toBe(5);
    });
});
