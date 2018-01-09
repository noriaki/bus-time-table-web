import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

// styles
import InactiveDaysBoardStyles from '../../styles/GuideBoard/InactiveDaysBoard-Style';

const InactiveDaysBoard = ({ departure, classes }) => (
  <Fragment>
    <Typography type="headline" className={classes.departure}>
      { departure }
      <span className={classes.suffix}>発</span>
    </Typography>
    <Typography>
      本日バス運行はありません
    </Typography>
    <Typography type="caption">
      (運行は土日祝を除く平日のみ)<br />
      運行日の時刻表は下部「時刻表」参照
    </Typography>
  </Fragment>
);
InactiveDaysBoard.propTypes = {
  departure: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(InactiveDaysBoardStyles)(InactiveDaysBoard);
