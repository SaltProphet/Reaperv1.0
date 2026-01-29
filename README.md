# REAPER

Python CLI for Reddit market research. Harvests pain point threads and generates insights.

## Installation

```bash
pip install -e .
```

## Configuration

Set environment variables for Reddit API:

```bash
export REDDIT_CLIENT_ID=your_client_id
export REDDIT_CLIENT_SECRET=your_client_secret
export REDDIT_USER_AGENT=REAPER/0.1.0
```

## Usage

### Harvest threads

```bash
reaper harvest --sub entrepreneurship --limit 100
```

### Generate report

```bash
reaper report
```

## Search Keywords

- "is there a tool"
- "tired of manually"
- "pricing is insane"
- "alternative to"
