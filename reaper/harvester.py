import os
from typing import List, Dict, Any
import praw


class RedditHarvester:
    SEARCH_QUERIES = [
        "is there a tool",
        "tired of manually",
        "pricing is insane",
        "alternative to"
    ]

    def __init__(self):
        self.reddit = praw.Reddit(
            client_id=os.environ.get("REDDIT_CLIENT_ID"),
            client_secret=os.environ.get("REDDIT_CLIENT_SECRET"),
            user_agent=os.environ.get("REDDIT_USER_AGENT", "REAPER/0.1.0")
        )

    def harvest(self, subreddit: str, limit: int = 100) -> List[Dict[str, Any]]:
        results = []
        sub = self.reddit.subreddit(subreddit)
        
        for query in self.SEARCH_QUERIES:
            try:
                for submission in sub.search(query, limit=limit // len(self.SEARCH_QUERIES)):
                    thread_data = {
                        'id': submission.id,
                        'title': submission.title,
                        'subreddit': submission.subreddit.display_name,
                        'author': str(submission.author) if submission.author else '[deleted]',
                        'score': submission.score,
                        'url': f"https://reddit.com{submission.permalink}",
                        'created_utc': int(submission.created_utc),
                        'num_comments': submission.num_comments,
                        'selftext': submission.selftext
                    }
                    results.append(thread_data)
            except Exception:
                continue
        
        return results
