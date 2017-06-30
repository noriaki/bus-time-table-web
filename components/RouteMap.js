import React from 'react';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import MapIcon from 'material-ui/svg-icons/maps/map';

import { silver } from '../themes/colors';

const RouteMap = ({ id, dest }) => (
  <Card>
    <CardHeader
      title={`${dest}行きルート`}
      avatar={<MapIcon color={silver} />}
      titleStyle={styles.cardHeaderTitle}
      actAsExpander
      showExpandableButton />
    <CardMedia expandable>
      <picture>
        <source
          media="(min-width: 450px)"
          srcSet={`/static/images/map${id}@3x.png`} />
        <img
          src={`/static/images/map${id}.png`}
          srcSet={mapImgSrcSet(id)}
          style={styles.img}
          alt="map" />
      </picture>
    </CardMedia>
  </Card>
);

export default RouteMap;

const mapImgSrcSet = id => ([
  `/static/images/map${id}@2x.png 2x`,
  `/static/images/map${id}@3x.png 3x`,
].join(','));

const styles = {
  img: { width: '100%' },
  cardHeaderTitle: { lineHeight: '24px' },
};
