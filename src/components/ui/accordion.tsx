'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '~/lib/utils';

/**
 * Wraps the Radix Accordion root and adds a `data-slot="accordion"` attribute.
 *
 * @param props - Props forwarded to the underlying Radix Accordion Root
 * @returns The rendered Accordion root element
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/**
 * Wraps a Radix Accordion Item and applies default border styling and a data-slot attribute.
 *
 * The component composes the provided `className` with base border classes (`border-b last:border-b-0`)
 * and forwards all other props to the underlying Radix Accordion Item.
 *
 * @returns A React element rendering the styled Accordion Item
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  );
}

/**
 * Renders an accordion trigger wrapped in a header, including a chevron that visually rotates when the item is open.
 *
 * @param className - Additional class names applied to the trigger element.
 * @param children - Content displayed inside the trigger (typically the trigger label).
 * @returns The rendered accordion trigger element with built-in layout, focus, and open-state styles.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-ui-400 pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * Renders accordion content with open/close animations and a padded inner wrapper.
 *
 * @param className - Additional CSS classes applied to the inner content wrapper.
 * @param children - Elements displayed inside the accordion panel.
 * @returns The AccordionPrimitive.Content element with state-based animations, overflow handling, and inner padding.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
