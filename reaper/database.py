import sqlite3
from typing import List, Dict, Any


class Database:
    def __init__(self, db_path: str = "reaper.db"):
        self.db_path = db_path
        self._init_db()

    def _init_db(self) -> None:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS threads (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    subreddit TEXT NOT NULL,
                    author TEXT,
                    score INTEGER,
                    url TEXT NOT NULL,
                    created_utc INTEGER NOT NULL,
                    num_comments INTEGER,
                    selftext TEXT
                )
            """)
            conn.commit()

    def insert_thread(self, thread_data: Dict[str, Any]) -> bool:
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.execute("""
                    INSERT OR IGNORE INTO threads 
                    (id, title, subreddit, author, score, url, created_utc, num_comments, selftext)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    thread_data['id'],
                    thread_data['title'],
                    thread_data['subreddit'],
                    thread_data['author'],
                    thread_data['score'],
                    thread_data['url'],
                    thread_data['created_utc'],
                    thread_data['num_comments'],
                    thread_data['selftext']
                ))
                conn.commit()
                return cursor.rowcount > 0
        except Exception:
            return False

    def get_all_threads(self) -> List[Dict[str, Any]]:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute("""
                SELECT * FROM threads ORDER BY score DESC
            """)
            return [dict(row) for row in cursor.fetchall()]

    def get_thread_count(self) -> int:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("SELECT COUNT(*) FROM threads")
            return cursor.fetchone()[0]
