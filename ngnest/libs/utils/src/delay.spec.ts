import { expect } from 'chai';
import { delay } from "./delay";

describe('Delay', () => {
    it('should wait till time', async () => {
        let counter = 0;
        const i = setInterval(() => counter++, 100);
        await delay(2000);
        clearInterval(i);
        expect(counter).to.be.greaterThan(17);

    });
});