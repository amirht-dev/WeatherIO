import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = PropsWithChildren<{
  container?: string | Element | HTMLElement;
}>;

function Portal({ children, container = document.body }: PortalProps) {
  let target;
  if (typeof container === 'string') {
    const element = document.querySelector(container);
    if (!element)
      throw new Error(`element with ${container} selector does not exists`);
    target = element;
  } else {
    target = container;
  }
  return createPortal(children, target);
}

export default Portal;
