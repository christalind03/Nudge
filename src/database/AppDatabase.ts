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
    try {
      this.localDatabase
        .prepare('DELETE FROM blocks WHERE id = ?')
        .run(blockID);

      return this.queryResult();
    } catch (errorObj) {
      return this.queryResult(errorObj);
    }
  }

  public insertBlock(blockData: FormBlock) {
    try {
      const id = randomUUID();

      this.localDatabase
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

      return this.queryResult();
    } catch (errorObj) {
      return this.queryResult(errorObj);
    }
  }

  public readBlock(blockID: string) {
    const databaseBlock = this.localDatabase
      .prepare(`SELECT * FROM blocks WHERE id = ?`)
      .get(blockID) as DatabaseBlock;

    if (databaseBlock) {
      const { active_days, id, name, time_end, time_start } = databaseBlock;

      return {
        activeDays: active_days,
        id,
        name,
        timeEnd: time_end,
        timeStart: time_start,
      } as Block;
    }

    throw Error(`Block with ID ${blockID} not found`);
  }

  public readBlocks() {
    const databaseBlocks = this.localDatabase
      .prepare('SELECT * FROM blocks')
      .all() as DatabaseBlock[];

    return databaseBlocks.map(toCamelCase) as Block[];
  }

  public updateBlock(blockID: string, blockData: FormBlock) {
    try {
      this.localDatabase
        .prepare(
          `
          UPDATE blocks SET name = ?, active_days = ?, time_start = ?, time_end = ?
          WHERE id = ?
        `
        )
        .run(
          blockData.name,
          blockData.activeDays,
          blockData.timeStart,
          blockData.timeEnd,
          blockID
        );

      return this.queryResult();
    } catch (errorObj) {
      return this.queryResult(errorObj);
    }
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

  private queryResult(errorObj?: unknown) {
    if (errorObj) {
      return {
        message: errorObj instanceof Error ? errorObj.message : errorObj,
        success: false,
      };
    }

    return { success: true };
  }
}

export default AppDatabase;
