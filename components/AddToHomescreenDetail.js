import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ImageLooksOne from 'material-ui/svg-icons/image/looks-one';
import ImageLooksTwo from 'material-ui/svg-icons/image/looks-two';
import ImageLooks3 from 'material-ui/svg-icons/image/looks-3';
import ImageLooks4 from 'material-ui/svg-icons/image/looks-4';

import { blueSky } from '../themes/colors';

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

const AddToHomescreenDetail = () => (
  <section>
    <h1 style={styles.header}>
      <img src="/static/icons/app-114x114@2x.png" alt="app-icon" style={styles.headerIcon} />
      <span style={styles.headerText}>3 Stepでアプリ化できます</span>
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

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #aaa',
    fontSize: '1em',
    paddingBottom: '0.1em',
    marginBottom: 0,
    marginLeft: '1em',
    marginRight: '1em',
  },
  headerIcon: {
    display: 'inline-flex',
    height: '1.8em',
    width: '1.8em',
    borderRadius: '0.4em',
    marginRight: '0.4em',
  },
  headerText: {
    display: 'inline-flex',
  },
};

export default AddToHomescreenDetail;
