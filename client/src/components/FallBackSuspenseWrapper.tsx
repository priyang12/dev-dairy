import { Suspense, lazy } from 'react';
import Spinner from './spinner';

function FallBackSuspenseWrapper({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: boolean;
}) {
  return (
    <Suspense fallback={fallback ? <Spinner /> : null}>{children}</Suspense>
  );
}

FallBackSuspenseWrapper.defaultProps = {
  fallback: true,
};

export default FallBackSuspenseWrapper;
