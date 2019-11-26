import React, { useEffect } from 'react';

// material-ui components
import Divider from '@material-ui/core/Divider';

// containers
import Clock from '~/containers/ClockContainer';

// components
import TitleBar from '~/components/TitleBar';
import TimersBoard from '~/components/TimersBoard';
import Timetables from '~/components/Timetables';
import Notice from '~/components/Notice';
import AboutApps from '~/components/AboutApps';
import ContactModal from '~/components/ContactModal';
import Footer from '~/components/Footer';

// styles
import useStyles from '~/styles/Base-Style';

const IndexPage = () => {
  const clock = Clock.useContainer();
  // componentDidMount, componentWillUnmount
  useEffect(() => {
    clock.start();
    return () => { clock.stop(); };
  }, []);

  const classes = useStyles();

  return (
    <main>
      <TitleBar />
      <article className={classes.article}>
        <TimersBoard clock={clock} />
      </article>
      <article className={classes.article}>
        <Notice />
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
      <Footer />
    </main>
  );
};

IndexPage.getInitialProps = ({ res }) => {
  if (res) {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  }
  return {};
};

export default IndexPage;
