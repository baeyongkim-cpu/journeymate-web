import urllib.request
import urllib.parse
import json

def get_commons_video(query):
    search_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch={urllib.parse.quote(query + ' type:video')}&format=json"
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        if not data['query']['search']: return None
        for item in data['query']['search']:
            title = item['title']
            info_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=videoinfo&viprop=url&format=json"
            req2 = urllib.request.Request(info_url, headers={'User-Agent': 'Mozilla/5.0'})
            data2 = json.loads(urllib.request.urlopen(req2).read().decode('utf-8'))
            pages = data2['query']['pages']
            page_id = list(pages.keys())[0]
            url = pages[page_id]['videoinfo'][0]['url']
            if 'derivatives' in pages[page_id]['videoinfo'][0]:
                for d in pages[page_id]['videoinfo'][0]['derivatives']:
                    if d['src'].endswith('.mp4'):
                        return d['src']
            if url.endswith('.mp4'): return url
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return None

url = get_commons_video("South Korea drone")
print(f"URL='{url}'")
