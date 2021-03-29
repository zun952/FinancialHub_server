import * as mocha from "mocha";
import { expect } from 'chai';
import assert from 'assert';
import { ping } from '../Index';

describe('Index test', () => {
    it('ping test', async (): Promise<any> => {
        // expect(await ping()).to.not.equal('1');
        // expect(await ping()).to.equal({
        //     success: true,
        //     message: 'OK',
        //     code: 200,
        //     data: { gecko_says: '(V3) To the Moon!' }
        // });
        assert.strictEqual(await ping(), await ping());
    });
});