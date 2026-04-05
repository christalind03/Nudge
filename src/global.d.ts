import { Block, FormBlock } from '@/database/types';

declare global {
  interface Window {
    databaseAPI: {
      deleteBlock: (blockID: string) => Promise<boolean>;
      insertBlock: (blockData: FormBlock) => Promise<boolean>;
      readBlock: (blockID: string) => Promise<Block>;
      readBlocks: () => Promise<Block[]>;
      updateBlocks: (blockID: string, blockData: FormBlock) => Promise<boolean>;
    };
  }
}
