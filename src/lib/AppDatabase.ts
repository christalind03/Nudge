import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'node:path';

class AppDatabase {
  private localDatabase;

  public constructor() {
    const databasePath = path.join(app.getPath('userData'), 'database.sqlite');

    this.localDatabase = new Database(databasePath);
    this.localDatabase.pragma('foreign_keys = ON');
    this.localDatabase.pragma('journal_mode = WAL');

    this.databaseInit();
  }

  public databaseClose() {
    this.localDatabase.close();
  }

  private databaseInit() {
    this.localDatabase.exec(`
      CREATE TABLE IF NOT EXISTS blocks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        active_days TEXT NOT NULL,
        time_start TEXT NOT NULL,
        time_end TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS reminders (
        id TEXT PRIMARY KEY,
        block_id TEXT REFERENCES blocks(id) ON DELETE CASCADE,
        label TEXT NOT NULL,
        enabled INTEGER NOT NULL DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS reminders_randomized (
        id TEXT PRIMARY KEY REFERENCES reminders(id) ON DELETE CASCADE,
        fire_at TEXT NOT NULL,
        minimum_interval INTEGER NOT NULL,
        maximum_interval INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS reminders_scheduled (
        id TEXT PRIMARY KEY REFERENCES reminders(id) ON DELETE CASCADE,
        schedule TEXT NOT NULL
      );
    `);
  }
}

export default AppDatabase;