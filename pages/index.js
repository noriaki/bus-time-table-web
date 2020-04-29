import React, { useEffect } from 'react';

// material-ui components
import Divider from '@material-ui/core/Divider';

// containers
import Clock from '~/containers/ClockContainer';

// components
import TitleBar from '~/components/TitleBar';
import TimersBoard from '~/components/TimersBoard';
import Timetables from '~/components/Timetables';
import AboutApps from '~/components/AboutApps';
import ContactModal from '~/components/ContactModal';
import Footer from '~/components/Footer';

// styles
import useStyles from '~/styles/Base-Style';

const IndexPage = ({ buildId }) => {
  const clock = Clock.useContainer();
  // componentDidMount, componentWillUnmount
  useEffect(() => {
    clock.start();
    return () => { clock.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  return (
    <main>
      <TitleBar />
      <article className={classes.article}>
        <TimersBoard clock={clock} />
      </article>
      <Divider variant="middle" className={classes.divider} />
      <article className={classes.article}>
        <Timetables clock={clock} />
      </article>
      <Divider variant="middle" className={classes.divider} />
      <article className={classes.article}>
        <AboutApps />
        <ContactModal />
      </article>
      <Footer buildId={buildId} />
    </main>
  );
};

export const getStaticProps = () => {
  const { BUILD_ID } = process.env;
  if (BUILD_ID == null) {
    return {
      props: { buildId: 'dev' },
    };
  }
  return {
    props: { buildId: BUILD_ID },
  };
};

export default IndexPage;
