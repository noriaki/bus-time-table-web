import React from 'react';
import { styled } from 'react-free-style';
import { List, ListItem } from 'material-ui/List';
import ImageLooksOne from 'material-ui/svg-icons/image/looks-one';
import ImageLooksTwo from 'material-ui/svg-icons/image/looks-two';
import ImageLooks3 from 'material-ui/svg-icons/image/looks-3';
import ImageLooks4 from 'material-ui/svg-icons/image/looks-4';

import { blueSky } from '../themes/colors';
import AddToHomescreenDetailStyles from '../styles/AddToHomescreenDetail-Style';

const steps = [
  {
    icon: <ImageLooksOne />,
    text: 'ブラウザ下部アイコンをタップ',
  }, {
    icon: <ImageLooksTwo />,
    text: '「ホーム画面に追加」をタップ',
  }, {
    icon: <ImageLooks3 />,
    text: '「追加」をタップ',
  }, {
    icon: <ImageLooks4 />,
    text: 'アイコンからいつでも起動OK',
  },
];

const AddToHomescreenDetail = ({ styles }) => (
  <section>
    <h1 className={styles.header}>
      <img src="/static/icons/app-114x114@2x.png" alt="app-icon" className={styles.headerIcon} />
      <span className={styles.headerText}>3 Stepでアプリ化できます</span>
    </h1>
    <List>{steps.map(buildListItem)}</List>
  </section>

);

const buildListItem = ({ icon, text }, i) => (
  <ListItem
    key={i}
    leftIcon={<icon.type color={blueSky} />}
    secondaryText={text}>
    <img
      src={`/static/images/ios-add-to-homescreen-step0${i + 1}.jpg`}
      alt={`add-to-homescreen-step0${i + 1}`}
      style={{ width: '100%' }} />
  </ListItem>
);

export default styled(AddToHomescreenDetailStyles)(AddToHomescreenDetail);
