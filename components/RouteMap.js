import React from 'react';
import { styled } from 'react-free-style';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import MapIcon from 'material-ui/svg-icons/maps/map';

import { silver } from '../themes/colors';
import RouteMapStyles, { cardHeaderTitle } from '../styles/RouteMap-Style';

const RouteMap = ({ id, dest, styles }) => (
  <Card>
    <CardHeader
      title={`${dest}行きルート`}
      avatar={<MapIcon color={silver} />}
      titleStyle={cardHeaderTitle}
      actAsExpander
      showExpandableButton />
    <CardMedia expandable>
      <picture>
        <source
          media="(min-width: 450px)"
          srcSet={`/static/images/map${id}@3x.png`} />
        <img
          className={styles.img}
          src={`/static/images/map${id}.png`}
          srcSet={mapImgSrcSet(id)}
          alt="map" />
      </picture>
    </CardMedia>
  </Card>
);

export default styled(RouteMapStyles)(RouteMap);

const mapImgSrcSet = id => ([
  `/static/images/map${id}@2x.png 2x`,
  `/static/images/map${id}@3x.png 3x`,
].join(','));
