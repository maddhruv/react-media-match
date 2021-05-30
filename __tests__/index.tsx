import * as React from 'react';
import { create } from 'react-test-renderer';
import { Above, Below, MediaMatcher, MediaMock, pickMatch, ProvideMediaMatchers } from '../src';

describe('Specs', () => {
  it('should render mobile using ProvideMediaMatchers override', () => {
    const wrapper = create(
      <ProvideMediaMatchers state={{ mobile: true, desktop: false, tablet: false }}>
        <MediaMatcher mobile="1" tablet="2" desktop="3" />
      </ProvideMediaMatchers>
    );
    expect(wrapper.toJSON()).toEqual('1');
  });

  it('should render mobile', () => {
    const wrapper = create(
      <MediaMock mobile={true}>
        <MediaMatcher mobile="1" tablet="2" desktop="3" />
      </MediaMock>
    );
    expect(wrapper.toJSON()).toEqual('1');
  });

  it('should render tablet', () => {
    const wrapper = create(
      <MediaMock tablet={true}>
        <MediaMatcher mobile="1" tablet="2" desktop="3" />
      </MediaMock>
    );
    expect(wrapper.toJSON()).toEqual('2');
  });

  it('should render desktop', () => {
    const wrapper = create(
      <MediaMock desktop={true}>
        <MediaMatcher mobile="1" tablet="2" desktop="3" />
      </MediaMock>
    );
    expect(wrapper.toJSON()).toEqual('3');
  });

  it('should render tablet for desktop if it is not set', () => {
    const wrapper = create(
      <MediaMock desktop={true}>
        <MediaMatcher mobile="1" tablet="2" />
      </MediaMock>
    );
    expect(wrapper.toJSON()).toEqual('2');
  });

  it('should render mobile for desktop if it is not set', () => {
    const wrapper = create(
      <MediaMock tablet={true}>
        <MediaMatcher mobile="1" desktop="2" />
      </MediaMock>
    );
    expect(wrapper.toJSON()).toEqual('1');
  });

  it('Above render', () => {
    const wrapper1 = create(
      <MediaMock mobile={true}>
        <Above mobile={true}>content</Above>
      </MediaMock>
    );
    expect(wrapper1.toJSON()).toEqual(null);

    const wrapper2 = create(
      <MediaMock tablet={true}>
        <Above mobile={true}>content</Above>
      </MediaMock>
    );
    expect(wrapper2.toJSON()).toEqual('content');
  });

  it('Above including render', () => {
    const wrapper1 = create(
      <MediaMock mobile={true}>
        <Above including={true} mobile={true}>
          content
        </Above>
      </MediaMock>
    );
    expect(wrapper1.toJSON()).toEqual('content');

    const wrapper2 = create(
      <MediaMock mobile={true}>
        <Above including={true} tablet={true}>
          content
        </Above>
      </MediaMock>
    );
    expect(wrapper2.toJSON()).toEqual(null);
  });

  it('Below render', () => {
    const wrapper1 = create(
      <MediaMock tablet={true}>
        <Below tablet={true}>content</Below>
      </MediaMock>
    );
    expect(wrapper1.toJSON()).toEqual(null);

    const wrapper2 = create(
      <MediaMock mobile={true}>
        <Below tablet={true}>content</Below>
      </MediaMock>
    );
    expect(wrapper2.toJSON()).toEqual('content');
  });

  it('Below including ender', () => {
    const wrapper1 = create(
      <MediaMock tablet={true}>
        <Below including={true} tablet={true}>
          content
        </Below>
      </MediaMock>
    );
    expect(wrapper1.toJSON()).toEqual('content');

    const wrapper2 = create(
      <MediaMock desktop={true}>
        <Below including={true} tablet={true}>
          content
        </Below>
      </MediaMock>
    );
    expect(wrapper2.toJSON()).toEqual(null);
  });

  it('pickMatch', () => {
    const try0 = pickMatch(
      {
        mobile: false,
        tablet: false,
        desktop: false,
      },
      {
        mobile: { notUndefined: 'yes' },
      }
    );
    expect(try0.notUndefined).toBe('yes');

    const try1 = pickMatch(
      {
        mobile: false,
        tablet: false,
        desktop: false,
      },
      {
        tablet: { notUndefined: 'yes' },
      }
    );
    expect(try1!.notUndefined).toBe('yes');

    const try2 = pickMatch(
      {
        mobile: true,
        tablet: false,
        desktop: false,
      },
      {
        tablet: 2,
        desktop: 24,
      },
      42
    );
    expect(try2).toBe(42);

    const try3 = pickMatch(
      {
        mobile: false,
        tablet: false,
        desktop: false,
      },
      {
        mobile: 1,
        tablet: 2,
        desktop: 3,
      }
    );
    expect(try3).toBe(3);

    expect(
      pickMatch(
        {
          mobile: false,
          tablet: false,
          desktop: false,
        },
        {}
      )
    ).toBe(undefined);

    expect(
      pickMatch(
        {
          mobile: false,
          tablet: false,
          desktop: false,
        },
        {
          desktop: 3,
        }
      )
    ).toBe(3);

    expect(
      pickMatch(
        {
          mobile: false,
          tablet: false,
          desktop: false,
        },
        {
          mobile: 1,
          tablet: 2,
          desktop: 3,
        }
      )
    ).toBe(3);

    expect(
      pickMatch(
        {
          mobile: true,
          tablet: true,
          desktop: true,
        },
        {
          mobile: 1,
          tablet: 2,
          desktop: 3,
        }
      )
    ).toBe(1);

    expect(
      pickMatch(
        {
          mobile: false,
          tablet: true,
          desktop: false,
        },
        {
          mobile: 1,
          tablet: 2,
          desktop: 3,
        }
      )
    ).toBe(2);

    expect(
      pickMatch(
        {
          mobile: false,
          tablet: true,
          desktop: false,
        },
        {
          mobile: 1,
          desktop: 3,
        }
      )
    ).toBe(1);

    expect(
      pickMatch(
        {
          mobile: true,
          tablet: false,
          desktop: false,
        },
        {
          mobile: 1,
          tablet: 2,
          desktop: 3,
        }
      )
    ).toBe(1);
  });
});
