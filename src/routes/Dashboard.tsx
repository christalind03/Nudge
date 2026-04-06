import { Fragment } from 'react';

import { RouteHeader } from '@/components/RouteHeader';

export function Dashboard() {
  return (
    <Fragment>
      <RouteHeader routeLabel="Dashboard" />
      <div>Dashboard</div>
    </Fragment>
  );
}
