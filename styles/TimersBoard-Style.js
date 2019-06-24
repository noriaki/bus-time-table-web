import { makeStyles } from '@material-ui/styles';

import { premiumBlackPalette } from '~/contexts/mui/themes/colors';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '20% auto',
    gridTemplateRows: 'auto 32px auto 32px auto',
    gridColumnGap: 16,
    gridRowGap: 8,
    justifyItems: 'stretch',
    alignItems: 'center',
  },
  itemFullWidth: {
    gridColumn: '1 / -1',
  },
  itemRightSide: {
    gridColumn: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  itemLeftSide: {
    gridRow: '2 / 5',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  arrowIcon: {
    color: premiumBlackPalette[200],
  },
});

export default useStyles;
