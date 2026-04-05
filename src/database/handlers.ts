import { ipcMain } from 'electron';

import AppDatabase from '@/database/AppDatabase';
import { FormBlock } from '@/database/types';

export default function initHandlers(appDatabase: AppDatabase) {
  ipcMain.handle('blocks:delete', (_, blockID: string) => {
    return appDatabase.deleteBlock(blockID);
  });

  ipcMain.handle('blocks:insert', (_, blockData: FormBlock) => {
    return appDatabase.insertBlock(blockData);
  });

  ipcMain.handle('blocks:read', (_, blockID: string) => {
    return appDatabase.readBlock(blockID);
  });

  ipcMain.handle('blocks:readAll', () => {
    return appDatabase.readBlocks();
  });

  ipcMain.handle(
    'blocks:update',
    (_, blockID: string, blockData: FormBlock) => {
      return appDatabase.updateBlock(blockID, blockData);
    }
  );
}
