import React from 'react';
import Link from 'next/link';
import { Subscribe } from 'unstated';

// material-ui components
import Typography from '@material-ui/core/Typography';

// containers
import ClockContainer from '~/containers/ClockContainer';

// components
import TestClock from '~/components/TestClock';

const IndexPage = () => (
  <main>
    <Typography component="h1" variant="h1">Hello World</Typography>
    <Subscribe to={[ClockContainer]}>
      { clock => <TestClock clock={clock} /> }
    </Subscribe>
    <p>
      <Link href="/test">
        <a>link to test page</a>
      </Link>
    </p>
  </main>
);

export default IndexPage;
