import moment from 'moment';
import { renderHook } from '@testing-library/react-hooks';

import useNotice from '~/hooks/useNotice';

describe('useNotice hooks', () => {
  it('should be true in suspension days (2020/04/08-)', () => {
    const subjectTime = moment('2020-04-08T04:00:00');
    const { result } = renderHook(() => useNotice(subjectTime));
    const { hasNotice, text } = result.current;
    expect(hasNotice).toBe(true);
    expect(text).not.toBeNull();
  });

  it('should be false when before the start of suspension day', () => {
    const subjectTime = moment('2020-04-07T23:59:59');
    const { result } = renderHook(() => useNotice(subjectTime));
    const { hasNotice, text } = result.current;
    expect(hasNotice).toBe(false);
    expect(text).toBeNull();
  });

  it('should be false when before the start of suspension days over midnight', () => {
    const subjectTime = moment('2020-04-08T03:59:59');
    const { result } = renderHook(() => useNotice(subjectTime));
    const { hasNotice, text } = result.current;
    expect(hasNotice).toBe(false);
    expect(text).toBeNull();
  });

  it('should be true when end of suspension days', () => {
    const subjectTime = moment('2020-05-26T09:00:00');
    const { result } = renderHook(() => useNotice(subjectTime));
    const { hasNotice, text } = result.current;
    expect(hasNotice).toBe(true);
    expect(text).not.toBeNull();
  });

  it('should be false when after the end of suspension day', () => {
    const subjectTime = moment('2033-01-01T06:00:00');
    const { result } = renderHook(() => useNotice(subjectTime));
    const { hasNotice, text } = result.current;
    expect(hasNotice).toBe(false);
    expect(text).toBeNull();
  });
});
