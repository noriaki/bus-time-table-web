import React from 'react';

// material-ui components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// data
import hmTimetableNext from '~/data/home-timetable-20191202.json';
import hgTimetableNext from '~/data/st-higashiginza-timetable-20191202.json';
import sbTimetableNext from '~/data/st-shimbashi-timetable-20191202.json';

// containers
import { createTimetableContainer } from '~/containers/TimetableContainer';

// components
import TitleBar from '~/components/TitleBar';
import Timetable from '~/components/Timetable';
import Footer from '~/components/Footer';

// styles
import useStyles from '~/styles/Base-Style';

const HomeTimetable = createTimetableContainer(hmTimetableNext);
const HigashiGinzaTimetable = createTimetableContainer(hgTimetableNext);
const ShimbashiTimetable = createTimetableContainer(sbTimetableNext);

const FuturePage = () => {
  const currentTime = Date.now();
  const classes = useStyles();

  return (
    <main>
      <TitleBar backTo="/" />
      <article className={classes.article}>
        <Typography component="h2" variant="h6">
          時刻表（2019/12/02更新予定）
        </Typography>
        <Card>
          <CardContent>
            <HomeTimetable.Provider>
              <Timetable
                clock={{ currentTime }}
                TimetableContainer={HomeTimetable} />
            </HomeTimetable.Provider>
          </CardContent>
          <CardContent>
            <HigashiGinzaTimetable.Provider>
              <Timetable
                clock={{ currentTime }}
                TimetableContainer={HigashiGinzaTimetable} />
            </HigashiGinzaTimetable.Provider>
          </CardContent>
          <CardContent>
            <ShimbashiTimetable.Provider>
              <Timetable
                clock={{ currentTime }}
                TimetableContainer={ShimbashiTimetable} />
            </ShimbashiTimetable.Provider>
          </CardContent>
        </Card>
      </article>
      <Footer />
    </main>
  );
};

export default FuturePage;
