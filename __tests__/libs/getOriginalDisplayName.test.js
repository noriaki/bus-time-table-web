import compose from 'recompose/compose';
import getDisplayNameRecompose from 'recompose/getDisplayName';
import { withStyles } from 'material-ui/styles';

// libs
import getOriginalDisplayName, {
  getDisplayName,
} from '../../libs/getOriginalDisplayName';
import setComponentName from '../../libs/setComponentName';

describe('getOriginalDisplayName', () => {
  let TestComponent;
  beforeEach(() => {
    TestComponent = () => 'test component';
  });

  describe('inner getDisplayName', () => {
    it('returning `componentName` value when passed components have it', () => {
      TestComponent.componentName = 'Test';
      const expected = 'Test';
      expect(getDisplayName(TestComponent)).toEqual(expected);
    });

    it('returning recompose.getDisplayName value when passed coponents not have it', () => {
      const expected = 'TestComponent';
      expect(getDisplayName(TestComponent)).toEqual(expected);
      expect(getDisplayName(TestComponent))
        .toEqual(getDisplayNameRecompose(TestComponent));
    });
  });

  it('returning componentName when wrap component name in ()', () => {
    const expected = 'TestComponent';
    TestComponent = withStyles({ t: 't' })(TestComponent);
    expect(getOriginalDisplayName(TestComponent)).toEqual(expected);
  });

  it('returning componentName when wrap component name in []', () => {
    const expected = 'T';
    TestComponent = setComponentName(expected)(TestComponent);
    expect(getOriginalDisplayName(TestComponent)).toEqual(expected);
  });

  it('returning componentName when wrap component name in [] with ()', () => {
    const expected = 'T';
    TestComponent = compose(
      setComponentName(expected),
      withStyles({ t: 't' })
    )(TestComponent);
    expect(getOriginalDisplayName(TestComponent)).toEqual(expected);
  });

  it('returning componentName when wrap component name in () with []', () => {
    const expected = 'T';
    TestComponent = compose(
      withStyles({ t: 't' }),
      setComponentName(expected)
    )(TestComponent);
    expect(getOriginalDisplayName(TestComponent)).toEqual(expected);
  });
});
