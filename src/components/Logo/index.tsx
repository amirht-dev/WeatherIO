import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Link } from 'react-router';

export type LogoProps = ComponentPropsWithoutRef<'a'>;

const Logo = forwardRef<HTMLAnchorElement, LogoProps>((props, ref) => {
  return (
    <Link to="/" {...props} ref={ref}>
      <img
        src="/images/logo.png"
        alt="logo"
        className="w-[inherit]"
        width={364}
        height={58}
      />
    </Link>
  );
});

export default Logo;
