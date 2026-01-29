# REAPER Usage Example

## Setup

1. Get Reddit API credentials from https://www.reddit.com/prefs/apps
2. Set environment variables:

```bash
export REDDIT_CLIENT_ID=your_client_id_here
export REDDIT_CLIENT_SECRET=your_secret_here
export REDDIT_USER_AGENT=REAPER/0.1.0
```

## Example Usage

### Harvest threads from entrepreneurship subreddit:
```bash
reaper harvest --sub entrepreneurship --limit 100
```

### Harvest from multiple subreddits:
```bash
reaper harvest --sub SaaS --limit 50
reaper harvest --sub startups --limit 50
reaper harvest --sub smallbusiness --limit 50
```

### Generate report:
```bash
reaper report
```

### Save report to file:
```bash
reaper report > market_research.md
```

## What Gets Harvested

REAPER searches for threads containing pain points:
- "is there a tool" - People looking for solutions
- "tired of manually" - Manual process pain points
- "pricing is insane" - Pricing objections
- "alternative to" - Competitor alternatives

## Output

The report shows:
- Thread score (Reddit upvotes)
- Subreddit
- Title
- Author
- Comment count
- Direct link to thread

Results are sorted by score (highest engagement first).
