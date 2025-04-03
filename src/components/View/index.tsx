import useCombineRefs from '@/hooks/useCombineRefs';
import { twMerge } from '@/lib/tailwind-merge';
import { PropsWithAsChild } from '@/types/utils';
import { createCTX } from '@/utils';
import { Transition } from '@headlessui/react';
import { Slot } from '@radix-ui/react-slot';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  RefCallback,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import Portal from '../Portal';

export const { context: ViewContext, hook: useViewContext } = createCTX<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  viewRef: React.RefObject<HTMLDivElement | null>;
}>('View');

export const View = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  (props, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const id = `view_${useId()}`;

    const combinedRef = useCombineRefs(ref, internalRef);

    return (
      <ViewContext.Provider value={{ open, setOpen, id, viewRef: internalRef }}>
        <div {...props} ref={combinedRef} />
      </ViewContext.Provider>
    );
  }
);
View.displayName = 'View';

export const ViewContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { open, id } = useViewContext();

  const callbackRef = useCallback<RefCallback<HTMLDivElement>>(
    (e) => {
      const rect = document
        .querySelector(`.view-trigger[data-view-id="${id}"]`)
        ?.getBoundingClientRect();

      if (!rect) return;

      const { x, y, width, height } = rect;

      e?.style.setProperty('--x', `${x + width / 2}px`);
      e?.style.setProperty('--y', `${y + height / 2}px`);
    },
    [id]
  );

  const combinedRef = useCombineRefs(ref, callbackRef);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <Portal>
      <Transition
        as="div"
        show={open}
        {...props}
        data-view-id={id}
        ref={combinedRef}
        className={twMerge(
          'view-content fixed inset-0 duration-300 z-20 bg-surface text-surface-fg',
          'data-[closed]:opacity-0',
          'data-[enter]:animate-view-expand data-[leave]:animate-view-collapse'
        )}
      />
    </Portal>
  );
});
ViewContent.displayName = 'ViewContent';

export const ViewTrigger = forwardRef<
  HTMLButtonElement,
  PropsWithAsChild<React.ComponentPropsWithoutRef<'button'>>
>(({ asChild, ...props }, ref) => {
  const internalRef = useRef<HTMLButtonElement>(null);
  const { setOpen, id } = useViewContext();

  const combinedRef = useCombineRefs(ref, internalRef);

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...props}
      ref={combinedRef}
      className={`view-trigger ${props.className}`}
      data-view-id={id}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen((p) => !p);
      }}
    />
  );
});
ViewTrigger.displayName = 'ViewTrigger';

export const ViewClose = forwardRef<
  HTMLButtonElement,
  PropsWithAsChild<React.ComponentPropsWithoutRef<'button'>>
>(({ asChild, ...props }, ref) => {
  const { setOpen } = useViewContext();

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...props}
      ref={ref}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
    />
  );
});
ViewClose.displayName = 'ViewClose';
