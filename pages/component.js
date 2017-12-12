import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import withMaterialUI from '../containers/withMaterialUI';

import GuideBoard from '../components/GuideBoard';
import TimersBoardStyle from '../styles/TimersBoard-Style';

const ComponentPage = ({ classes, ...props }) => {
  const currentTime = Date.now();
  const remaining = Math.floor(Math.random() * 1000 * 60 * 60 * 2);
  return (
    <main className={classes.main}>
      <h1>component</h1>
      <div className={classes.container}>
        <div className={classes.crossBar}>
          <GuideBoard
            departure="マンション"
            nextTime={currentTime + remaining}
            remaining={remaining}
            onPrev={false}
            onNext={() => console.log('next')} />
        </div>
        <div className={classes.rightAside}>
          <GuideBoard
            vertically
            departure="東銀座駅"
            nextTime={currentTime + remaining}
            remaining={remaining}
            onPrev={() => console.log('prev 東銀座')}
            onNext={() => console.log('next 東銀座')} />
        </div>
        <div className={classes.crossBar}>
          <GuideBoard
            departure="新橋駅"
            nextTime={currentTime + remaining}
            remaining={remaining}
            onPrev={() => console.log('prev 新橋')}
            onNext={() => console.log('next 新橋')} />
        </div>
        <div className={classes.leftAsideSeparator}>
          <div className={classes.upArrow} />
          <div className={classes.upArrow} />
          <div className={classes.upArrow} />
        </div>
        <div className={classes.rightTopSeparator}>
          <div className={classes.downArrow} />
        </div>
        <div className={classes.rightBottomSeparator}>
          <div className={classes.downArrow} />
        </div>
      </div>
    </main>
  );
};

const enhance = compose(withMaterialUI, withStyles(TimersBoardStyle));

export default enhance(ComponentPage);
