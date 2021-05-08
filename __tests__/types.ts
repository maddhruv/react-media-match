import { hover } from '../src/mediaVariants';

describe('types', () => {
  it('hover', () => {
    const test1 = hover.pickMatch(
      {
        incapable: true,
        capable: false,
      },
      {
        incapable: { check: true },
        capable: { check: false },
      }
    );

    expect(test1.check).toBe(true);

    const test2 = hover.pickMatch(
      {
        incapable: false,
        capable: false,
      },
      {
        capable: { check: false },
      }
    );

    expect(test2!.check).toBe(false);

    const testDefault = hover.pickMatch(
      {
        incapable: true,
        capable: false,
      },
      {
        capable: false,
      },
      true
    );

    expect(testDefault).toBe(true);
  });

  describe('extra', () => {
    it('exposes queries', () => {
      expect(hover.queries.capable).toEqual('(hover: hover)');
    });
  });
});
