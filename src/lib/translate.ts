export async function translateText(text: string, sourceLang = 'ko', targetLang = 'en'): Promise<string> {
  if (!text) return "";
  try {
    // URL-encode the text to safely pass it in the query string
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn("Translation API responded with status:", response.status);
      return text;
    }

    const data = await response.json();
    
    // The response data is nested arrays. 
    // data[0] contains an array of sentences.
    // Each sentence array's first element (item[0]) is the translated text.
    if (data && data[0]) {
      return data[0].map((item: any) => item[0]).join('');
    }
    
    return text;
  } catch (err) {
    console.error("Translation error:", err);
    return text; // Fallback to original text on error
  }
}
