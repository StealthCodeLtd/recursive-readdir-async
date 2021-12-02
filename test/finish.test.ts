import assert from 'assert';
import * as rra from '../src/index';

jest.mock('fs', () => {
  const origin = jest.requireActual('fs');
  return {
    __esModule: true,
    ...origin,
    realpath: (path:any, cb:any) => {
      throw new Error('boom');
    },
    // stat: (path:any, cb:any) => {
    //         if (/test\/test$/.test(path)) {
    //             cb(new Error('boom'));
    //             return;
    //         }

    //         return
    // }
  };
});

describe('load', function() {
  describe('error control', function() {
    // towards 100% coverage: generate failure to test line #99 (try/catch)
    it('controlled error for exceptions - part 3: file system fatality', async function() {
      let isOk = false;
      try {
        const res = await rra.list('./test');
        if (res.error) {
          isOk = true;
        };
        assert.equal(isOk, true, 'unexpected behavior (no json with error)');
      } catch (error) {
        isOk = false;
      }
      assert.equal(isOk, true, 'unexpected behavior (error or no json with error)');
    });
/*
    it('controlled error for exceptions - part 4: file system fatality #2', async function() {
      // const fs = rra.FS
      const rpf = rra.FS.stat;
      try {
        // rra.FS.stat = function fakeStat(path, cb) {
        //     if (/test\/test$/.test(path)) {
        //         // console.error('STAT:', path);
        //         cb(new Error('boom'));
        //         return;
        //     }

        //     rpf(path, cb);
        // };
        const res = await rra.list('./test');

        assert.ok(!res.error, 'unexpected behavior');
        assert.strictEqual(res.length, 2, 'unexpected behavior');
        assert.ok(res[0].error, 'unexpected behavior (no json with error for item)');
      } catch (error) {
        assert.ok(false, 'unexpected behavior');
      }
      rra.FS.stat = rpf;
    });*/
  });
});
