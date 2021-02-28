import React, { useEffect } from 'react';

// material-ui components
import Divider from '@material-ui/core/Divider';

// containers
import Clock from '~/containers/ClockContainer';

// components
import TitleBar from '~/components/TitleBar';
import TmpTimetable20210301 from '~/components/TmpTimetable20210301';
import Notice from '~/components/Notice';
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
        <TmpTimetable20210301 />
      </article>
      <article className={classes.article}>
        <Notice />
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

export const getServerSideProps = () => {
  const currentTime = Date.now();
  const { VERCEL_GIT_COMMIT_SHA } = process.env;
  return {
    props: {
      buildId: VERCEL_GIT_COMMIT_SHA || 'development',
      currentTime,
    },
  };
};

export default IndexPage;
