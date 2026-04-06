import { Fragment } from 'react';

import { RouteHeader } from '@/components/RouteHeader';

export function Reminders() {
  return (
    <Fragment>
      <RouteHeader routeLabel="Reminders" />
      <div>Reminders</div>
    </Fragment>
  );
}
