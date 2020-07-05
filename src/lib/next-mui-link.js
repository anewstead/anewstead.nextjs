/*
rename adapt from:
https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js

<NextMuiLink href="/about">
  About
</NextMuiLink>

<Button component={NextMuiLink} href="/about">
  About
</Button>

<ListItem button component={NextMuiLink} href="/about">
  <ListItemText primary="About" />
</ListItem>
 */

import MuiLink from '@material-ui/core/Link';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, ...other } = props;

  return (
    /* eslint-disable jsx-a11y/anchor-has-content */
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
    /* eslint-enable jsx-a11y/anchor-has-content */
  );
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefetch: PropTypes.bool,
};

const NextMuiLink = (props) => {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  );
};

NextMuiLink.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

export default React.forwardRef((props, ref) => {
  return <NextMuiLink {...props} innerRef={ref} />;
});
