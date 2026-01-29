import sys
import argparse
from typing import Optional
from reaper.database import Database
from reaper.harvester import RedditHarvester


class CLI:
    def __init__(self):
        self.db = Database()
        self.harvester = RedditHarvester()

    def harvest(self, subreddit: str, limit: int) -> None:
        threads = self.harvester.harvest(subreddit, limit)
        count = 0
        for thread in threads:
            if self.db.insert_thread(thread):
                count += 1
        print(f"Harvested {count} new threads from r/{subreddit}")

    def report(self) -> None:
        threads = self.db.get_all_threads()
        if not threads:
            print("No threads found in database")
            return
        
        print("# REAPER Market Research Report\n")
        print("| Score | Subreddit | Title | Author | Comments | URL |")
        print("|-------|-----------|-------|--------|----------|-----|")
        
        for thread in threads[:50]:
            title = thread['title'].replace('|', '\\|')[:60]
            print(f"| {thread['score']} | r/{thread['subreddit']} | {title} | u/{thread['author']} | {thread['num_comments']} | {thread['url']} |")


def main() -> None:
    parser = argparse.ArgumentParser(prog="reaper", description="Reddit market research CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    harvest_parser = subparsers.add_parser("harvest", help="Harvest Reddit threads")
    harvest_parser.add_argument("--sub", required=True, help="Subreddit to harvest from")
    harvest_parser.add_argument("--limit", type=int, default=100, help="Number of threads to harvest")
    
    report_parser = subparsers.add_parser("report", help="Generate Markdown report")
    
    args = parser.parse_args()
    cli = CLI()
    
    if args.command == "harvest":
        cli.harvest(args.sub, args.limit)
    elif args.command == "report":
        cli.report()


if __name__ == "__main__":
    main()
