/**
 * This @file contains a mock for Button component
 */

export const Button = (props: React.ComponentPropsWithoutRef<'button'>) => (
  <button {...props} data-testid="button">
    {props.children}
  </button>
);
