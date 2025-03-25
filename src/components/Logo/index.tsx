import { ComponentPropsWithoutRef, forwardRef } from 'react';

export type LogoProps = ComponentPropsWithoutRef<'a'>;

const Logo = forwardRef<HTMLAnchorElement, LogoProps>((props, ref) => {
  return (
    <a href="/" {...props} ref={ref}>
      <img
        src="/images/logo.png"
        alt="logo"
        className="w-[inherit]"
        width={364}
        height={58}
      />
    </a>
  );
});

export default Logo;
