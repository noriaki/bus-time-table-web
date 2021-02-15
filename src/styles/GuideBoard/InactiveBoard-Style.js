import { makeStyles } from '@material-ui/styles';

// common styles
import departureStyles from './commons/departure';

const useStyles = makeStyles({ ...departureStyles }, { name: 'InactiveBoard' });

export default useStyles;
