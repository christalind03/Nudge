import { Block, FormBlock, QueryResult } from '@/database/types';

declare global {
  interface Window {
    databaseAPI: {
      deleteBlock: (blockID: string) => Promise<QueryResult>;
      insertBlock: (blockData: FormBlock) => Promise<QueryResult>;
      readBlock: (blockID: string) => Promise<Block>;
      readBlocks: () => Promise<Block[]>;
      updateBlocks: (
        blockID: string,
        blockData: FormBlock
      ) => Promise<QueryResult>;
    };
  }
}
