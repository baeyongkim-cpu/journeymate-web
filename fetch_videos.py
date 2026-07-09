import urllib.request
import urllib.parse
import json
import sys

def get_commons_video(query):
    # Search for video
    search_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch={urllib.parse.quote(query + ' type:video')}&format=json"
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        if not data['query']['search']:
            return None
        title = data['query']['search'][0]['title']
        
        # Get video URL
        info_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=videoinfo&viprop=url&format=json"
        req2 = urllib.request.Request(info_url, headers={'User-Agent': 'Mozilla/5.0'})
        data2 = json.loads(urllib.request.urlopen(req2).read().decode('utf-8'))
        
        pages = data2['query']['pages']
        page_id = list(pages.keys())[0]
        
        # usually wikimedia serves original file (often webm) or transcoded mp4. 
        # let's get the original url first
        url = pages[page_id]['videoinfo'][0]['url']
        
        # if there are transcoded derivatives, find an mp4
        if 'derivatives' in pages[page_id]['videoinfo'][0]:
            for d in pages[page_id]['videoinfo'][0]['derivatives']:
                if d['src'].endswith('.mp4'):
                    url = d['src']
                    break
        
        return url
    except Exception as e:
        print(f"Error fetching {query}: {e}")
        return None

queries = ["airport", "island ocean", "traditional market", "fish market"]
for q in queries:
    url = get_commons_video(q)
    print(f"URL_{q.replace(' ', '_')}='{url}'")
