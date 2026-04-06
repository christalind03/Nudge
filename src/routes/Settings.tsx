import { Fragment } from 'react';

import { RouteHeader } from '@/components/RouteHeader';

export function Settings() {
  return (
    <Fragment>
      <RouteHeader displayCreateButton={false} routeLabel="Settings" />
      <div>Settings</div>
    </Fragment>
  );
}
