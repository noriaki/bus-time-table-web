import React, {
  Children,
  isValidElement,
  Fragment,
} from 'react';
import { Element, ScrollLink } from 'react-scroll';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// libs
import getOriginalDisplayName from '../libs/getOriginalDisplayName';
import { calcDuration } from '../libs/scroller';

// styles
import TableOfContentsStyles from '../styles/TableOfContents-Style';

// custom components
const ScrollButton = ScrollLink(Button);

const TableOfContents = ({ labels, children, classes }) => {
  const elements = Children.toArray(children).filter(
    element => isValidElement(element)
  );
  const wrapedElements = elements.map((component) => {
    const name = getOriginalDisplayName(component);
    return (
      <Element
        key={`scrollTarget-${name}`}
        name={name}>
        { component }
      </Element>
    );
  });
  return (
    <Fragment>
      <nav className={classes.container}>
        <Typography
          type="subheading"
          component="h1"
          className={classes.header}>
          Contents
        </Typography>
        <ul className={classes.ul}>
          { Object.keys(labels).map(buildTOCLinkItem(labels, classes)) }
        </ul>
      </nav>
      { wrapedElements }
    </Fragment>
  );
};
export default withStyles(TableOfContentsStyles)(TableOfContents);

const buildTOCLinkItem = (labels, classes) => name => (
  <li key={name} className={classes.li}>
    <ScrollButton
      dense
      color="accent"
      href={`#${name}`}
      className={classes.link}
      to={name}
      offset={-64}
      duration={calcDuration}
      spy
      hashSpy
      smooth>
      { labels[name] }
    </ScrollButton>
  </li>
);
