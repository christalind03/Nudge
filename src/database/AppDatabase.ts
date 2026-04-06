import Database from 'better-sqlite3';
import { app } from 'electron';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

import { Block, DatabaseBlock, FormBlock, toCamelCase } from '@/database/types';

class AppDatabase {
  private localDatabase;

  public constructor() {
    const databasePath = path.join(app.getPath('userData'), 'database.sqlite');

    this.localDatabase = new Database(databasePath);
    this.localDatabase.pragma('foreign_keys = ON');
    this.localDatabase.pragma('journal_mode = WAL');

    this.initDatabase();
  }

  public closeDatabase() {
    this.localDatabase.close();
  }

  public deleteBlock(blockID: string) {
    const queryResult = this.localDatabase
      .prepare('DELETE FROM blocks WHERE id = ?')
      .run(blockID);

    return 0 < queryResult.changes;
  }

  public insertBlock(blockData: FormBlock) {
    const id = randomUUID();
    const queryResult = this.localDatabase
      .prepare(
        `
        INSERT INTO blocks (id, name, active_days, time_start, time_end)
        VALUES (@id, @name, @activeDays, @timeStart, @timeEnd)
      `
      )
      .run({
        id,
        ...blockData,
        activeDays: JSON.stringify(blockData.activeDays),
      });

    return 0 < queryResult.changes;
  }

  public readBlock(blockID: string) {
    const databaseBlock = this.localDatabase
      .prepare(`SELECT * FROM blocks WHERE id = ?`)
      .get(blockID) as DatabaseBlock;

    if (databaseBlock) {
      const { active_days } = databaseBlock;

      return {
        ...toCamelCase(databaseBlock),
        activeDays: JSON.parse(active_days),
      } as Block;
    }

    throw Error(`Block with ID ${blockID} not found`);
  }

  public readBlocks() {
    const databaseBlocks = this.localDatabase
      .prepare('SELECT * FROM blocks')
      .all() as DatabaseBlock[];

    return databaseBlocks.map((databaseBlock) => {
      const { active_days } = databaseBlock;

      return {
        ...toCamelCase(databaseBlock),
        activeDays: JSON.parse(active_days),
      };
    }) as Block[];
  }

  public updateBlock(blockID: string, blockData: FormBlock) {
    const queryResult = this.localDatabase
      .prepare(
        `
        UPDATE blocks SET name = ?, active_days = ?, time_start = ?, time_end = ?
        WHERE id = ?
      `
      )
      .run(
        blockData.name,
        JSON.stringify(blockData.activeDays),
        blockData.timeStart,
        blockData.timeEnd,
        blockID
      );

    return 0 < queryResult.changes;
  }

  private initDatabase() {
    this.localDatabase.exec(`
      CREATE TABLE IF NOT EXISTS blocks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        active_days TEXT NOT NULL,
        time_start TEXT NOT NULL,
        time_end TEXT NOT NULL
      );
    `);
  }
}

export default AppDatabase;
