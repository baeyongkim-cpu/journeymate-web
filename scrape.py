import urllib.request
import re
import sys

def get_pexels_video(query):
    url = f"https://www.pexels.com/search/videos/{query}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'https://videos\.pexels\.com/video-files/\d+/[^"\'\s]+', html)
        if match:
            return match.group(0)
    except Exception as e:
        print(f"Error: {e}")
    return None

queries = ["airport", "island", "market", "fish%20market"]
for q in queries:
    vid = get_pexels_video(q)
    print(f"{q}: {vid}")
