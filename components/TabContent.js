import React from 'react';

import RemainingTimer from './RemainingTimer';
import RouteMap from './RouteMap';

const TabContent = ({ id, data, dest, activeDays, front }) => (
  <div key={id}>
    <RemainingTimer
      data={data}
      dest={dest}
      activeDays={activeDays}
      front={front} />
    <section>
      <RouteMap id={id} dest={dest} />
    </section>
  </div>
);

export default TabContent;
