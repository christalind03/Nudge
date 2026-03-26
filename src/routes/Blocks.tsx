import { useParams } from 'react-router-dom';

export function Blocks() {
  const { blockID } = useParams();

  return <div>Block ID: {blockID}</div>;
}
