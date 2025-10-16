/**
 * Simple mock place holder with a test id prop
 */

const MockComponent = ({ testId }: { testId?: string }) => (
  <div data-testid={testId ?? 'mock-component'} />
);

export default MockComponent;
