import React from 'react';

// material-ui components
import Typography from '@material-ui/core/Typography';

// containers
import Clock from '~/containers/ClockContainer';

// components
import TimersBoard from '~/components/TimersBoard';

const IndexPage = () => (
  <main>
    <Typography component="h1" variant="h5">
      Deux Tours シャトルバス
    </Typography>
    <Clock.Provider>
      <TimersBoard />
    </Clock.Provider>
  </main>
);

export default IndexPage;
