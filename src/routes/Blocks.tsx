import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Error } from '@/components/Error';
import { Loading } from '@/components/Loading';
import { RouteHeader } from '@/components/RouteHeader';

export function Blocks() {
  const { blockID } = useParams();
  const {
    data: blockData,
    error: blockError,
    isPending: blockPending,
  } = useQuery({
    queryFn: () => window.databaseAPI.readBlock(blockID),
    queryKey: ['blockData', blockID],
  });

  if (blockPending) {
    return (
      <div className="m-5">
        <Loading />
      </div>
    );
  }

  if (blockError || !blockData) {
    return (
      <div className="m-5">
        <Error
          errorDescription={
            blockError?.message || 'An unexpected error has occurred'
          }
          errorTitle="Block Not Found"
        />
      </div>
    );
  }

  return (
    <Fragment>
      <RouteHeader routeLabel={blockData.name} />
      <div>Block ID: {blockID}</div>
    </Fragment>
  );
}
