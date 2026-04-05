import { contextBridge, ipcRenderer } from 'electron';

import { FormBlock } from '@/database/types';

const databaseAPI = {
  deleteBlock: (blockID: string) =>
    ipcRenderer.invoke('blocks:delete', blockID),
  insertBlock: (blockData: FormBlock) =>
    ipcRenderer.invoke('blocks:insert', blockData),
  readBlock: (blockID: string) => ipcRenderer.invoke('blocks:read', blockID),
  readBlocks: () => ipcRenderer.invoke('blocks:readAll'),
  updateBlocks: (blockID: string, blockData: FormBlock) =>
    ipcRenderer.invoke('blocks:update', blockID, blockData),
};

contextBridge.exposeInMainWorld('databaseAPI', databaseAPI);
