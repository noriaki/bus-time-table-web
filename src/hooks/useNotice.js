import { useMemo } from 'react';
import moment from 'moment';

import { offset, timeShift } from '~/libs/timeTableDataHandler';
import notices from '~/data/notice.json';

const useNotice = (now) => {
  const currentTime = moment(now || Date.now()).utcOffset(offset);
  if (currentTime.hours() < timeShift) { currentTime.subtract(1, 'day'); }
  const result = notices.find((notice) => (
    currentTime.isBetween(notice.start, notice.end, 'day', '[]')
  ));
  const currentDay = currentTime.format('YYYY-MM-DD');
  const ret = useMemo(() => {
    if (result == null) {
      return {
        hasNotice: false,
        contents: null,
      };
    }
    return {
      hasNotice: true,
      contents: result.contents,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]);

  return ret;
};

export default useNotice;
