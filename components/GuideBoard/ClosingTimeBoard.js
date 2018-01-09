import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

// styles
import ClosingTimeBoardStyles from '../../styles/GuideBoard/ClosingTimeBoard-Style';

const ClosingTimeBoard = ({ departure, classes }) => (
  <Fragment>
    <Typography type="headline" className={classes.departure}>
      { departure }
      <span className={classes.suffix}>発</span>
    </Typography>
    <Typography>本日のバスは終了しました</Typography>
    <Typography type="caption">
      明日以降は下部「時刻表」参照
    </Typography>
  </Fragment>
);
ClosingTimeBoard.propTypes = {
  departure: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(ClosingTimeBoardStyles)(ClosingTimeBoard);
