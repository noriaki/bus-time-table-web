import React, { useState, useCallback } from 'react';

// material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// components
import HalfModalCloseIcon from './HalfModalCloseIcon';

// styles
import useStyles from '~/styles/ContactModal/ContactModal-Style';

const formUri = 'https://docs.google.com/forms/d/e/1FAIpQLSc-Thtn4jIWPvdFq1wsBZ-1bj35mTvCWEqPeULVYH5KSFqWPg/viewform?embedded=true';

const ContactModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), [open]);
  const handleClose = useCallback(() => setOpen(false), [open]);

  const { form, ...classes } = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Button color="secondary" onClick={handleOpen}>
          アプリへの要望・問い合わせ
        </Button>
      </Grid>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        classes={classes}>
        <HalfModalCloseIcon onClick={handleClose} />
        <iframe
          src={formUri}
          title="DEUX TOURS シャトルバス時刻表 問い合わせフォーム"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className={form}>
          読み込んでいます...
        </iframe>
      </SwipeableDrawer>
    </>
  );
};

export default ContactModal;
