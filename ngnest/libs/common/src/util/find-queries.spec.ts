import { toORILikeContains } from './find-queries';
describe('OR ILIKE Contains', () => {
    it('should convert name=ahmet&age=35', () => {
        const actual = toORILikeContains('name=ahmet&age=35');
        expect(actual.length).toBeGreaterThan(0);
    });
});
