/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';

const NextComposed = React.forwardRef((props, ref) => {
  // eslint-disable-next-line object-curly-newline
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

// eslint-disable-next-line object-curly-newline
const Link = ({ className, innerRef, naked, ...other }) => {
  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      {...other}
    />
  );
};

export default React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
));
