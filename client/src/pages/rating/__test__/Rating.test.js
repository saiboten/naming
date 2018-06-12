/* global describe, it, expect */
import { findHitsOnBoth } from '../Rating';

describe('findHitsOnBoth', () => {
  it('should be ok', () => {
    const res = findHitsOnBoth({
      myid: {
        nameid1: {
          accepted: true,
          nickname: 'Jens'
        },
        nameid2: {
          accepted: false,
          nickname: 'Per'
        },
        nameid3: {
          accepted: true,
          nickname: 'Johan'
        },
      },
      anotherperson: {
        nameid1: {
          accepted: true,
          nickname: 'Jens'
        },
        nameid2: {
          accepted: true,
          nickname: 'Per'
        },
        nameid3: {
          accepted: false,
          nickname: 'Johan'
        },
        nameid4: {
          accepted: false,
          nickname: 'Gisle'
        }
      }
    }, 'myid');

    expect(res.length).toBe(1);
    expect(res[0].nickname).toBe('Jens');
  });
  it('Should handle bad input', () => {
    const res = findHitsOnBoth();
    expect(res).toBe(undefined);
  });
});

