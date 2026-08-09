export interface CourseMeaning {
  title: string;
  desc: string;
}

export interface ScheduleItem {
  time: string;
  activityKo: string;
  activityEn: string;
}

export interface ScheduleDay {
  day: number;
  themeKo: string;
  themeEn: string;
  items: ScheduleItem[];
}

export type CourseType = 'day-trip' | '1-night' | '2-night' | '3-night';

export interface Course {
  id: string;
  type: CourseType;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  image: string;
  meaningKo: CourseMeaning[];
  meaningEn: CourseMeaning[];
  details: {
    duration: { ko: string; en: string };
    accommodation: { ko: string; en: string };
    timing: { ko: string; en: string };
    price: { ko: string; en: string };
  };
  schedule: ScheduleDay[];
}

export const courses: Course[] = [
  // ── 당일 코스 ──────────────────────────────────────────────────────────
  {
    id: "day-1",
    type: "day-trip",
    titleKo: "개항장 타임슬립",
    titleEn: "Open Port Time Slip",
    subtitleKo: "130년 근대 역사와 원조 짜장면, 레트로 골목을 하루에 담다",
    subtitleEn: "130 years of modern history, original jjajangmyeon, and retro alleys — all in one day",
    image: "https://images.unsplash.com/photo-1520680196853-272cb250c6fb?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      { title: "한국 유일의 차이나타운", desc: "붉은 패루와 황금 장식이 가득한 한국 유일의 공식 차이나타운에서 짜장면의 발원지를 직접 체험하며, 동서양이 교차했던 개항기의 특별한 역사를 만납니다." },
      { title: "근대 건축의 살아있는 박물관", desc: "일제 강점기와 개항 시대의 서양식 건축물이 그대로 남아있는 개항장 거리를 걸으며 시간이 멈춘 듯한 레트로 스냅 사진 투어를 즐깁니다." },
      { title: "원조 맛집 길거리 미식", desc: "짜장면 원조 골목과 닭강정 원조 신포국제시장을 모두 방문하는 인천 대표 미식 투어로, 한국 근대 음식 문화의 뿌리를 직접 맛봅니다." }
    ],
    meaningEn: [
      { title: "Korea's Only Official Chinatown", desc: "Experience the birthplace of Korean jjajangmyeon at Korea's only official Chinatown, adorned with red gates and golden decorations, where East meets West in a unique historical setting." },
      { title: "A Living Museum of Modern Architecture", desc: "Walk through the Open Port district where colonial-era Western-style buildings still stand, enjoying a retro photo tour through streets where time seems to have frozen." },
      { title: "Original Street Food Tour", desc: "Visit both the original jjajangmyeon alley and Sinpo Market — birthplace of Korean dakgangjeong chicken — for a deep dive into Incheon's culinary heritage." }
    ],
    details: {
      duration: { ko: "당일 (5~7시간)", en: "Day Trip (5–7 hours)" },
      accommodation: { ko: "숙박 없음 (당일 복귀)", en: "No accommodation (day trip)" },
      timing: { ko: "연중 가능 · 봄/가을 추천", en: "Year-round · Spring/Fall recommended" },
      price: { ko: "1인 약 200,000원~", en: "From KRW 200,000 per person" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "개항장 역사 & 미식 탐방",
        themeEn: "Open Port History & Food Tour",
        items: [
          { time: "10:00 - 11:00", activityKo: "[도착] 인천역 하차 & 차이나타운 입장, 패루 포토", activityEn: "[Arrival] Incheon Station → Chinatown entrance, photo at Paeru gate" },
          { time: "11:00 - 12:30", activityKo: "[미식] 원조 짜장면 점심 & 짜장면박물관 관람 (1883년 개항 역사)", activityEn: "[Dining] Original Jjajangmyeon lunch & Jjajangmyeon Museum (1883 Open Port history)" },
          { time: "12:30 - 13:30", activityKo: "[포토] 송월동 동화마을 벽화 포토투어 (도보 5분)", activityEn: "[Photo] Songwol-dong Fairy Tale Village mural photo walk (5 min on foot)" },
          { time: "13:30 - 15:30", activityKo: "[탐방] 개항장 근대 거리 — 인천개항박물관·근대건축전시관·제물포구락부", activityEn: "[Explore] Open Port Historic District — museums & colonial-era buildings" },
          { time: "15:30 - 16:30", activityKo: "[전망] 자유공원 — 인천항·원도심 파노라마 전망", activityEn: "[Viewpoint] Freedom Park — panoramic view of Incheon Port & downtown" },
          { time: "16:30 - 17:30", activityKo: "[미식] 신포국제시장 — 원조 닭강정·호떡 길거리 미식 투어", activityEn: "[Dining] Sinpo International Market — original dakgangjeong & street food tour" },
        ]
      }
    ]
  },
  {
    id: "day-2",
    type: "day-trip",
    titleKo: "송도 모던 시티라이프",
    titleEn: "Songdo Modern City Life",
    subtitleKo: "수상택시부터 스카이뷰까지, 인천의 미래도시를 하루에 경험하다",
    subtitleEn: "From water taxis to sky views — experience Incheon's futuristic smart city in one day",
    image: "/images/incheon/송도센트럴파크.jpg",
    meaningKo: [
      { title: "송도 센트럴파크 수상택시", desc: "미래도시의 스카이라인을 배경으로 하는 수상택시 탑승 경험. 공원 내 보트 체험과 함께 K-스마트시티의 감성을 온전히 즐깁니다." },
      { title: "세계 유일 문자박물관", desc: "2023년 개관한 국립세계문자박물관은 세계에서 유일하게 인류의 모든 문자를 한 곳에서 체험할 수 있는 공간입니다." },
      { title: "G타워 스카이뷰 & 야경", desc: "인천대교와 송도 전체를 조망하는 G타워 전망대에서 석양과 함께 도시를 내려다보는 특별한 경험." }
    ],
    meaningEn: [
      { title: "Songdo Central Park Water Taxi", desc: "A water taxi experience unlike any other — gliding across the park lake with a futuristic smart city skyline as your backdrop, embodying the essence of K-Smart City." },
      { title: "World's Only Writing Systems Museum", desc: "Opened in 2023, the National Museum of the World's Writing Systems is the only place on earth where you can experience all of humanity's writing systems in one space." },
      { title: "G-Tower Sky View & Night Scenery", desc: "Look down over the Incheon Bridge and all of Songdo from the G-Tower Observatory. A city that transforms completely from dusk to night." }
    ],
    details: {
      duration: { ko: "당일 (5~8시간)", en: "Day Trip (5–8 hours)" },
      accommodation: { ko: "숙박 없음 (당일 복귀)", en: "No accommodation (day trip)" },
      timing: { ko: "연중 가능 · 야경 포함 시 일몰 후 권장", en: "Year-round · Arrive before sunset for night view" },
      price: { ko: "1인 약 180,000원~", en: "From KRW 180,000 per person" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "송도 현대도시 & 야경 투어",
        themeEn: "Songdo Modern City & Night View Tour",
        items: [
          { time: "11:00 - 13:00", activityKo: "[체험] 송도 센트럴파크 — 수상택시 탑승 & 보트 체험, 공원 산책", activityEn: "[Activity] Songdo Central Park — water taxi ride, boat experience & park walk" },
          { time: "13:00 - 14:30", activityKo: "[미식] 센트럴파크 인근 오션뷰 브런치 카페", activityEn: "[Dining] Ocean-view brunch café near Central Park" },
          { time: "14:30 - 16:00", activityKo: "[문화] 국립세계문자박물관 (세계 유일) 또는 트라이볼 조형물 관람", activityEn: "[Culture] National Museum of World Writing Systems (world's only) or Tribowl sculpture" },
          { time: "16:00 - 17:30", activityKo: "[쇼핑] 트리플스트리트 & 현대프리미엄아울렛 자유 쇼핑", activityEn: "[Shopping] Triple Street & Hyundai Premium Outlet free shopping" },
          { time: "17:30 - 19:00", activityKo: "[전망] G타워 전망대 — 인천대교·송도 전경·석양 감상", activityEn: "[Viewpoint] G-Tower Observatory — Incheon Bridge & city panorama at sunset" },
          { time: "19:00 - 21:00", activityKo: "[야경] 송도 한옥마을 야경 & 저녁 식사", activityEn: "[Night View] Songdo Hanok Village illuminated scenery & dinner" },
        ]
      }
    ]
  },
  {
    id: "day-3",
    type: "day-trip",
    titleKo: "영종도 바다 & 무의도 자연",
    titleEn: "Yeongjong Sea & Muuido Nature",
    subtitleKo: "레일바이크, 해안 트레킹, 서해 일몰 — 공항 옆 섬에서 보내는 하루",
    subtitleEn: "Rail biking, coastal trekking, West Sea sunset — a full day on the island next to the airport",
    image: "/images/incheon/muuido.jpg",
    meaningKo: [
      { title: "공항 바로 옆 바다", desc: "인천국제공항에서 차로 10분 거리, 영종도 씨사이드 레일바이크로 시원한 바다 바람을 맞으며 서해 절경을 감상합니다. 귀국 전날 일정으로도 완벽한 코스입니다." },
      { title: "무의도 해상탐방로", desc: "바다 위에 세워진 1.4km 데크길을 걸으며 청정 서해를 발밑으로 내려다보는 독특한 경험. 소무의도 원시 해안 트레킹까지 더해 진정한 자연 속 힐링을 완성합니다." },
      { title: "서해 황홀한 일몰", desc: "을왕리 해수욕장에서 바라보는 서해 일몰은 수도권에서 가장 아름다운 일몰 명소 중 하나입니다. 조개구이 저녁과 함께 하루를 완벽하게 마무리합니다." }
    ],
    meaningEn: [
      { title: "Ocean Right Next to the Airport", desc: "Just 10 minutes from Incheon International Airport, the Yeongjong Seaside Rail Bike offers breathtaking West Sea scenery with ocean breezes. Perfect for the day before departure." },
      { title: "Muuido Marine Trail", desc: "Walk along a 1.4km deck path built over the sea, looking down at the clear West Sea below. Combined with pristine Somuuido coastal trail for a complete nature retreat." },
      { title: "Magical West Sea Sunset", desc: "The West Sea sunset viewed from Eurwang-ri Beach is considered one of the most beautiful in the greater Seoul area. End the day with grilled clams as the sun dips below the horizon." }
    ],
    details: {
      duration: { ko: "당일 (7~9시간)", en: "Day Trip (7–9 hours)" },
      accommodation: { ko: "숙박 없음 (당일 복귀)", en: "No accommodation (day trip)" },
      timing: { ko: "연중 가능 · 여름 해수욕·일몰 감상 최적", en: "Year-round · Summer swimming & sunset viewing are highlights" },
      price: { ko: "1인 약 220,000원~", en: "From KRW 220,000 per person" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "영종도 레일바이크 → 무의도 트레킹 → 을왕리 일몰",
        themeEn: "Rail Bike → Muuido Trekking → Eurwang-ri Sunset",
        items: [
          { time: "09:30 - 11:00", activityKo: "[액티비티] 영종 씨사이드 레일바이크 — 바다 뷰 레일바이크 체험", activityEn: "[Activity] Yeongjong Seaside Rail Bike — ocean-view rail biking experience" },
          { time: "11:00 - 12:30", activityKo: "[카페] 마시안 해변 카페거리 — 오션뷰 브런치 카페", activityEn: "[Café] Masian Beach Café Street — ocean-view brunch" },
          { time: "12:30 - 14:00", activityKo: "[이동·점심] 무의도 차량 페리 탑승 & 하나개 해수욕장 점심", activityEn: "[Transit] Board ferry to Muuido & lunch at Hanaegae Beach" },
          { time: "14:00 - 16:30", activityKo: "[트레킹] 소무의도 '무의바다누리길' 해안 데크 트레킹 (왕복 4km)", activityEn: "[Trekking] Somuuido 'Muui Sea Nuri Trail' coastal deck trek (4km round trip)" },
          { time: "16:30 - 18:30", activityKo: "[일몰·미식] 을왕리 해수욕장 — 서해 일몰 & 조개구이 저녁", activityEn: "[Sunset & Dining] Eurwang-ri Beach — West Sea sunset & grilled clam dinner" },
        ]
      }
    ]
  },

  // ── 1박 2일 코스 ───────────────────────────────────────────────────────
  {
    id: "overnight-1",
    type: "1-night",
    titleKo: "강화도 역사 감성 순례",
    titleEn: "Ganghwa Island Heritage Journey",
    subtitleKo: "UNESCO 세계유산부터 천년 사찰, 레트로 카페까지 — 한국의 깊은 역사를 하룻밤 사이에",
    subtitleEn: "UNESCO heritage, thousand-year temples, and retro cafés — Korea's deep history in one night",
    image: "https://images.unsplash.com/photo-1546874177-9e664107314e?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      { title: "UNESCO 고인돌과 선사 문명", desc: "강화도에 밀집된 UNESCO 세계문화유산 고인돌 군락지는 3,000년 전 선사시대 거석 문화의 흔적입니다. 전세계 고인돌의 40%가 한국에 있으며, 그 중심이 바로 강화도입니다." },
      { title: "한국 최고(最古) 사찰 전등사", desc: "서기 381년에 창건된 한국에서 가장 오래된 사찰, 전등사. 천년의 역사를 품은 삼랑성 성곽을 걸으며 시간을 초월한 고요함을 경험합니다." },
      { title: "조양방직 레트로 감성", desc: "1930년대 방직 공장을 개조한 강화 최대의 레트로 카페 조양방직은 강화 대표 인스타 핫플레이스입니다. 거대한 공장 안에서 마시는 커피 한 잔이 특별한 감성을 선사합니다." }
    ],
    meaningEn: [
      { title: "UNESCO Dolmens & Prehistoric Civilization", desc: "The concentration of UNESCO World Heritage dolmens on Ganghwa Island are remnants of a megalith culture 3,000 years old. Korea holds 40% of the world's dolmens, with Ganghwa at its center." },
      { title: "Jeondeungsa — Korea's Oldest Temple", desc: "Founded in 381 AD, Jeondeungsa is Korea's oldest active temple. Walking the ancient Samnangseong fortress walls surrounding it, you'll experience a timeless tranquility that transcends centuries." },
      { title: "Joyangbanjik Retro Café", desc: "A 1930s cotton mill transformed into Ganghwa's most iconic retro café, consistently the most-searched Instagram hotspot in Ganghwa. A cup of coffee inside this vast factory is uniquely atmospheric." }
    ],
    details: {
      duration: { ko: "1박 2일", en: "1 Night / 2 Days" },
      accommodation: { ko: "강화 한옥 게스트하우스 또는 프리미엄 펜션", en: "Ganghwa Hanok guesthouse or premium pension" },
      timing: { ko: "연중 가능 · 봄(벚꽃)·가을(단풍) 특히 추천", en: "Year-round · Spring (cherry blossom) & Fall (foliage) highly recommended" },
      price: { ko: "1인 약 500,000원~", en: "From KRW 500,000 per person" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "세계유산 & 천년 사찰 & 레트로",
        themeEn: "World Heritage & Ancient Temple & Retro",
        items: [
          { time: "10:00 - 12:00", activityKo: "[유산] 강화 고인돌 유적지 (UNESCO 세계문화유산, 선사시대 거석문화)", activityEn: "[Heritage] Ganghwa Dolmens — UNESCO World Heritage prehistoric megalith site" },
          { time: "12:00 - 13:30", activityKo: "[미식] 강화 로컬 한정식 점심 (밴댕이·꽃게탕)", activityEn: "[Dining] Traditional Korean set meal — local specialties (blue crab stew)" },
          { time: "13:30 - 15:30", activityKo: "[사찰] 전등사 — 한국 최고(最古) 사찰, 삼랑성 성곽 트레킹", activityEn: "[Temple] Jeondeungsa — Korea's oldest temple & Samnangseong fortress wall trekking" },
          { time: "15:30 - 17:30", activityKo: "[레트로] 조양방직 — 1930년대 방직공장 개조 대형 레트로 카페", activityEn: "[Retro] Joyangbanjik — iconic retro café in converted 1930s cotton mill" },
          { time: "17:30 - 18:30", activityKo: "[체험] 소창체험관 — 전통 직물(소창) 공예 체험", activityEn: "[Workshop] Sochang Experience Center — traditional textile craft workshop" },
          { time: "저녁", activityKo: "[숙박] 강화 한옥 게스트하우스 체크인 & 석식", activityEn: "[Stay] Check in at Hanok guesthouse & dinner" },
        ]
      },
      {
        day: 2,
        themeKo: "자연 트레킹 & 갯벌 체험",
        themeEn: "Nature Trekking & Tidal Flat Experience",
        items: [
          { time: "08:00 - 09:30", activityKo: "[조식] 한옥 전통 조식 & 마당 아침 산책", activityEn: "[Breakfast] Traditional Hanok breakfast & morning courtyard stroll" },
          { time: "09:30 - 12:00", activityKo: "[트레킹] 강화 나들길 2코스 — 고려 왕릉길 또는 갯벌 해안 도보", activityEn: "[Trekking] Ganghwa Nadeul-gil Trail — Goryeo Royal Tomb path or tidal flat coastal walk" },
          { time: "12:00 - 13:30", activityKo: "[미식] 강화 순무김치·약쑥 비빔밥 로컬 점심", activityEn: "[Dining] Local lunch — Ganghwa turnip kimchi & mugwort bibimbap" },
          { time: "13:30 - 15:30", activityKo: "[옵션] 교동도 대룡시장 (1950~60년대 재현 시장) + 화개정원 모노레일", activityEn: "[Option] Gyodongdo Daeryong Market (1950s-60s market recreation) + garden monorail" },
          { time: "15:30 - 17:00", activityKo: "[체험·귀환] 강화 동막해변 갯벌 체험 & 귀환", activityEn: "[Experience & Return] Dongmak Beach tidal flat experience & departure" },
        ]
      }
    ]
  },
  {
    id: "overnight-2",
    type: "1-night",
    titleKo: "파라다이스 웰니스 리트릿",
    titleEn: "Paradise Wellness Retreat",
    subtitleKo: "씨메르 스파, K-뷰티 트리트먼트, 서해 일몰 — 완벽한 럭셔리 힐링 1박",
    subtitleEn: "Cimer Spa, K-beauty treatments, West Sea sunset — the perfect luxury healing overnight",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      { title: "씨메르 아쿠아파라다이스", desc: "파라다이스시티 내 씨메르는 아시아 최고 수준의 스파·워터파크 시설입니다. 실내외 온수풀, 사우나, 스팀룸, 전문 테라피스트의 마사지로 몸과 마음을 완전히 내려놓는 하루를 선사합니다." },
      { title: "세계적 아트 컬렉션", desc: "파라다이스시티는 쿠사마 야요이 등 세계적 현대 미술 작가들의 작품이 로비와 복도 곳곳에 전시된 '아트테인먼트 리조트'입니다." },
      { title: "서해 황금빛 일몰", desc: "공항 옆 을왕리 해수욕장에서 바라보는 서해 일몰은 럭셔리 리조트 체류의 화룡점정입니다. K-뷰티 스파로 다듬어진 피부로 맞이하는 황홀한 낙조의 감동은 배가 됩니다." }
    ],
    meaningEn: [
      { title: "Cimer Aqua Paradise", desc: "Cimer at Paradise City is one of Asia's finest spa and waterpark facilities. Indoor/outdoor heated pools, saunas, steam rooms, and professional therapist massages — a complete mind-and-body escape." },
      { title: "World-Class Art Collection", desc: "Paradise City is an 'arttainment resort' featuring works by global contemporary artists like Yayoi Kusama displayed throughout lobbies and corridors. A gallery stroll within your hotel is uniquely moving." },
      { title: "Golden West Sea Sunset", desc: "The West Sea sunset at Eurwang-ri Beach next to the airport is the crown jewel of a luxury resort stay. The breathtaking dusk view is doubly magical after a day of K-beauty spa treatments." }
    ],
    details: {
      duration: { ko: "1박 2일", en: "1 Night / 2 Days" },
      accommodation: { ko: "파라다이스시티 호텔 (공항 5분, 5성급 복합리조트)", en: "Paradise City Hotel (5 min from airport, 5-star resort complex)" },
      timing: { ko: "연중 가능 · 겨울 스파 힐링 특히 추천", en: "Year-round · Winter spa retreat especially recommended" },
      price: { ko: "1인 약 800,000원~", en: "From KRW 800,000 per person" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "럭셔리 스파 & 아트 & 야경",
        themeEn: "Luxury Spa & Art & Night View",
        items: [
          { time: "14:00 - 15:00", activityKo: "[체크인] 파라다이스시티 호텔 체크인 & 리조트 오리엔테이션", activityEn: "[Check-in] Paradise City hotel check-in & resort orientation" },
          { time: "15:00 - 18:00", activityKo: "[스파] 씨메르 아쿠아파라다이스 — 실내외 온수풀·사우나·스팀룸·테라피", activityEn: "[Spa] Cimer Aqua Paradise — indoor/outdoor pools, sauna, steam room & therapy" },
          { time: "18:00 - 19:30", activityKo: "[미식] 파라다이스시티 내 레스토랑 프리미엄 디너", activityEn: "[Dining] Premium dinner at Paradise City restaurant" },
          { time: "19:30 - 21:30", activityKo: "[아트] 파라다이스시티 아트 갤러리 & 야간 포토투어 (세계적 현대미술 컬렉션)", activityEn: "[Art] Paradise City Art Gallery & night photo tour (world-class contemporary art collection)" },
        ]
      },
      {
        day: 2,
        themeKo: "K-뷰티 & 해변 & 일몰",
        themeEn: "K-Beauty & Beach & Sunset",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 호텔 뷔페 조식 & 수영장 모닝 스윔", activityEn: "[Breakfast] Hotel buffet breakfast & morning pool swim" },
          { time: "10:30 - 12:30", activityKo: "[K-뷰티] K-뷰티 스파 트리트먼트 (한방 마사지·기초 스킨케어 세션)", activityEn: "[K-Beauty] K-Beauty spa treatment (herbal massage & skincare session)" },
          { time: "12:30 - 14:00", activityKo: "[점심] 마시안 해변 오션뷰 카페 브런치", activityEn: "[Lunch] Masian Beach ocean-view café brunch" },
          { time: "14:00 - 16:30", activityKo: "[바다] 을왕리 해수욕장 자유 시간 & 일몰 감상", activityEn: "[Beach] Eurwang-ri Beach free time & sunset viewing" },
          { time: "16:30 - 18:00", activityKo: "[마무리·미식] 영종도 로컬 어시장 — 싱싱한 활어회 석식 & 귀환", activityEn: "[Farewell & Dining] Local fish market — fresh sashimi dinner & departure" },
        ]
      }
    ]
  },
  {
    id: "overnight-3",
    type: "1-night",
    titleKo: "무의도 자연 힐링 & 섬 캠프파이어",
    titleEn: "Muuido Nature Healing & Island Campfire",
    subtitleKo: "해상탐방로, 선상 낚시, 갯벌 체험 — 도시를 벗어나 섬에서 보내는 진짜 힐링",
    subtitleEn: "Marine trail, boat fishing, tidal flat — genuine island healing away from the city",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      { title: "바다 위 해상탐방로", desc: "하나개 해수욕장 앞 바다 위에 세워진 1.4km 데크길은 무의도의 상징입니다. 발밑으로 청정 서해 바다가 보이고, 탁 트인 수평선이 펼쳐지는 이 길 위에서 오직 자연과 나만 존재합니다." },
      { title: "선상 낚시 & 직화 구이", desc: "로컬 어부와 함께하는 선상 낚시 체험에서 직접 잡은 물고기를 선상에서 즉석으로 구워 먹는 경험은 어느 미슐랭 레스토랑도 줄 수 없는 특별한 미식입니다." },
      { title: "풀빌라 캠프파이어 힐링", desc: "낮에는 바다와 자연을 즐기고, 밤에는 풀빌라 프라이빗 온수풀과 파도 소리를 들으며 캠프파이어 야간 힐링으로 마무리합니다." }
    ],
    meaningEn: [
      { title: "Marine Trail Over the Sea", desc: "The iconic 1.4km deck path built over the sea at Hanaegae Beach is Muuido's signature. With the clear West Sea visible beneath your feet and an open horizon ahead — it's just you and nature." },
      { title: "Boat Fishing & Grilling", desc: "Going out to sea with a local fisherman and grilling what you catch right there on the boat is a gastronomic experience no Michelin-starred restaurant can replicate." },
      { title: "Pool Villa Campfire Healing", desc: "Days spent with the sea and nature, nights with a private heated pool villa and the sound of ocean waves. A campfire under the stars completes an evening impossible to find in the city." }
    ],
    details: {
      duration: { ko: "1박 2일", en: "1 Night / 2 Days" },
      accommodation: { ko: "무의도 풀빌라 또는 글램핑 펜션", en: "Muuido pool villa or glamping pension" },
      timing: { ko: "연중 가능 · 여름 갯벌·해수욕 최적", en: "Year-round · Summer for tidal flat & swimming" },
      price: { ko: "1인 약 600,000원~", en: "From KRW 600,000 per person" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "해상탐방로 & 선상 낚시 & 캠프파이어",
        themeEn: "Marine Trail & Boat Fishing & Campfire",
        items: [
          { time: "10:00 - 11:30", activityKo: "[이동] 잠진도 선착장 → 무의도 차량 페리 탑승", activityEn: "[Transit] Jamjindo ferry terminal → vehicle ferry to Muuido island" },
          { time: "11:30 - 13:00", activityKo: "[점심] 하나개 해수욕장 인근 로컬 해산물 — 꽃게·해물뚝배기", activityEn: "[Lunch] Local seafood near Hanaegae Beach — crab & seafood hot pot" },
          { time: "13:00 - 15:30", activityKo: "[탐방] 무의도 해상관광탐방로 (바다 위 데크 1.4km) & 하나개 해변 자유 시간", activityEn: "[Trail] Muuido Marine Tourism Trail (1.4km sea deck path) & Hanaegae Beach free time" },
          { time: "15:30 - 17:30", activityKo: "[트레킹] 소무의도 '무의바다누리길' 원시 해안 트레킹 & 일몰 포인트", activityEn: "[Trekking] Somuuido 'Sea Nuri Trail' — pristine coastal trekking & sunset viewpoint" },
          { time: "18:00 - 20:00", activityKo: "[체험·미식] 선상 낚시 체험 — 직접 잡은 물고기 즉석 구이 저녁", activityEn: "[Experience & Dining] Boat fishing — grill & eat what you catch for dinner" },
          { time: "20:00 - 22:00", activityKo: "[힐링] 풀빌라 프라이빗 온수풀 & 밤바다 파도소리 캠프파이어 힐링", activityEn: "[Healing] Pool villa private heated pool & campfire night healing with ocean wave sounds" },
        ]
      },
      {
        day: 2,
        themeKo: "갯벌 체험 & 해녀 시연 & 귀환",
        themeEn: "Tidal Flat & Haenyeo Demonstration & Return",
        items: [
          { time: "07:30 - 09:00", activityKo: "[조식] 섬 특산 전복죽 조식 & 아침 해변 산책", activityEn: "[Breakfast] Island specialty abalone porridge & morning beach walk" },
          { time: "09:00 - 11:00", activityKo: "[체험] 갯벌 체험 — 조개·게 잡기 & 해녀 어업 시연 관람", activityEn: "[Experience] Tidal flat — clam & crab digging & haenyeo diving demonstration" },
          { time: "11:00 - 13:00", activityKo: "[마무리] 실미도 방문 (영화 실미도 배경, 해안 절경) & 점심 귀환", activityEn: "[Farewell] Visit Silmido (backdrop of the film 'Silmido') & return with lunch" },
        ]
      }
    ]
  },

  // ── 2박 3일 / 3박 4일 코스 (기존, type 추가) ───────────────────────────
  {
    id: "course-1",
    type: "2-night",
    titleKo: "시간이 머무는 곳",
    titleEn: "Where Time Lingers",
    subtitleKo: "과거의 낭만과 미래의 여유가 교차하는, 온전한 쉼을 위한 여정",
    subtitleEn: "A journey for complete rest where past romance and future leisure intersect",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      { title: "개항장 근대골목 스냅", desc: "130년 전 개항기의 서양식 건축물 사이를 거닐며, 바쁘게 살아온 나의 시간을 잠시 멈추고 흑백 사진 속에 현재의 나를 아날로그 감성으로 기록합니다." },
      { title: "송도 센트럴파크 프라이빗 보팅", desc: "미래 도시의 스카이라인을 배경으로 잔잔한 호수 위를 떠다니며, 전담 호스트가 준비한 샴페인과 함께 오롯이 나와 동행자에게만 집중하는 고요한 시간을 가집니다." },
      { title: "무의도 해변 일몰 명상", desc: "붉게 물드는 서해의 낙조를 바라보며 번잡했던 마음을 비우는 싱잉볼 명상 시간입니다." }
    ],
    meaningEn: [
      { title: "Open Port Modern Alley Snaps", desc: "Strolling between 130-year-old Western-style buildings from the Open Port era, you pause your busy life and capture yourself in analog sensibility through black-and-white photography." },
      { title: "Songdo Central Park Private Boating", desc: "Drifting across a calm lake with a futuristic city skyline as your backdrop, accompanied by champagne prepared by your dedicated host — a quiet moment focused entirely on you and your companion." },
      { title: "Muuido Beach Sunset Meditation", desc: "Gazing at the West Sea as it turns crimson at dusk, a singing bowl meditation session to empty your busy mind and restore inner peace." }
    ],
    details: {
      duration: { ko: "2박 3일", en: "2 Nights / 3 Days" },
      accommodation: { ko: "영종도 오션뷰 프리미엄 풀빌라 1박 + 강화 한옥 1박", en: "1 night at Yeongjongdo ocean-view premium pool villa + 1 night at Ganghwa Hanok" },
      timing: { ko: "3월~11월 추천 (날씨 최적)", en: "March–November recommended (best weather)" },
      price: { ko: "6,400,000원 (2인 기준)", en: "KRW 6,400,000 (for 2 persons)" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "도착 & 인천 시내 탐방",
        themeEn: "Arrival & Incheon City Exploration",
        items: [
          { time: "10:00 - 12:00", activityKo: "[도착] 인천공항 픽업 & 웰컴 드링크 (차량 이동)", activityEn: "[Arrival] Incheon Airport pickup & welcome drink (in-vehicle)" },
          { time: "12:00 - 13:30", activityKo: "[미식] 차이나타운 원조 짜장면 점심 & 개항장 거리 산책", activityEn: "[Dining] Original Chinatown Jjajangmyeon lunch & Open Port street walk" },
          { time: "13:30 - 15:30", activityKo: "[스냅] 개항장 근대 골목 필름 감성 스냅 포토 세션", activityEn: "[Photo] Film-style snap photo session in modern Open Port alleys" },
          { time: "15:30 - 17:30", activityKo: "[체험] 송도 센트럴파크 프라이빗 보팅 & 샴페인 브런치", activityEn: "[Activity] Songdo Central Park private boating & champagne brunch" },
          { time: "17:30 - 19:30", activityKo: "[전망] G타워 전망대 석양 감상", activityEn: "[Viewpoint] G-Tower Observatory sunset view" },
          { time: "19:30 - 21:30", activityKo: "[미식] 송도 한옥마을 야경 & 한국식 오마카세 저녁", activityEn: "[Dining] Songdo Hanok Village night scenery & Korean omakase dinner" },
        ]
      },
      {
        day: 2,
        themeKo: "영종도 자연 & 풀빌라 힐링",
        themeEn: "Yeongjong Nature & Pool Villa Healing",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 영종도 오션뷰 카페 브런치 조식", activityEn: "[Breakfast] Yeongjongdo ocean-view café brunch" },
          { time: "10:30 - 12:30", activityKo: "[액티비티] 영종 씨사이드 레일바이크 — 서해 바다 뷰 레일바이크 체험", activityEn: "[Activity] Yeongjong Seaside Rail Bike — West Sea ocean-view rail biking" },
          { time: "12:30 - 14:00", activityKo: "[미식] 마시안 해변 오션뷰 점심 식사", activityEn: "[Dining] Masian Beach ocean-view lunch" },
          { time: "14:00 - 17:00", activityKo: "[힐링] 무의도 해상탐방로 트레킹 & 소무의도 해안 산책", activityEn: "[Wellness] Muuido Marine Trail trekking & Somuuido coastal walk" },
          { time: "17:00 - 19:00", activityKo: "[일몰] 을왕리 해수욕장 일몰 감상 & 싱잉볼 명상", activityEn: "[Sunset] Eurwang-ri Beach sunset & singing bowl meditation" },
          { time: "19:00 - 22:00", activityKo: "[미식·숙박] 오션뷰 풀빌라 체크인 & 전통 해산물 프라이빗 다이닝", activityEn: "[Dining & Stay] Ocean-view pool villa check-in & private traditional seafood dining" },
        ]
      },
      {
        day: 3,
        themeKo: "영종도 레일바이크 & 귀환",
        themeEn: "Yeongjong Rail Bike & Departure",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 풀빌라 프라이빗 조식 & 호스트 감사 롤링페이퍼 전달", activityEn: "[Breakfast] Private pool villa breakfast & host appreciation rolling paper" },
          { time: "10:30 - 12:30", activityKo: "[체험] 영종도 해안 레일바이크 타고 서해 바다바람 감상", activityEn: "[Activity] Yeongjongdo coastal rail bike ride enjoying West Sea ocean breeze" },
          { time: "12:30 - 14:00", activityKo: "[미식] 영종도 칼국수 & 해산물 파전 오션뷰 점심", activityEn: "[Dining] Yeongjongdo noodle soup & seafood pancake lunch with ocean view" },
          { time: "14:00 - 15:30", activityKo: "[추억/작별] 3일간의 추억 공유 및 공항 배웅 (4K 시네마틱 영상은 여행 종료 후 1주일 내 전달)", activityEn: "[Farewell] Share memories of 3 days & airport send-off (4K cinematic video delivered within 1 week after trip)" },
        ]
      }
    ]
  },
  {
    id: "course-2",
    type: "3-night",
    titleKo: "내면의 소리를 듣는 고요",
    titleEn: "Silence That Speaks Within",
    subtitleKo: "강화 천년 사찰의 새벽 예불부터 무의도 원시 자연까지, 진정한 내면의 쉼을 찾아서",
    subtitleEn: "From dawn prayers at a thousand-year temple in Ganghwa to Muuido's pristine nature — seeking true inner peace",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      { title: "전등사 새벽 예불 & 108배", desc: "서기 381년에 창건된 한국 최고(最古) 사찰에서 새벽 4시의 예불 소리와 함께 하루를 여는 경험. 천년의 시간이 흐른 고요함 속에서 나를 돌아봅니다." },
      { title: "강화도 나들길 명상 트레킹", desc: "UNESCO 고인돌 유적지와 고려 왕릉을 잇는 나들길을 천천히 걸으며, 한반도 5000년 역사의 숨결 속에서 자연과 하나가 되는 명상 트레킹을 경험합니다." },
      { title: "무의도 갯벌 체험 & 해녀 문화", desc: "전 세계적으로 유네스코 무형문화유산으로 등재된 해녀 문화를 직접 체험하고, 맨발로 갯벌을 걸으며 지구와 직접 연결되는 접지 힐링을 경험합니다." }
    ],
    meaningEn: [
      { title: "Jeondeungsa Dawn Prayer & 108 Bows", desc: "Beginning your day to the sound of dawn prayers at Korea's oldest temple, founded in 381 AD. Setting aside the noise of everyday life, you reflect on yourself in a thousand-year-old silence." },
      { title: "Ganghwa Nadeul-gil Meditation Trek", desc: "Walking slowly along the trail connecting UNESCO dolmens and Goryeo royal tombs, a meditative trek where you become one with nature amid the breath of 5,000 years of Korean history." },
      { title: "Tidal Flat Experience & Haenyeo Culture", desc: "Directly experiencing the haenyeo culture inscribed as UNESCO Intangible Cultural Heritage, and walking barefoot through tidal flats — a grounding healing experience that connects you directly to the earth." }
    ],
    details: {
      duration: { ko: "3박 4일", en: "3 Nights / 4 Days" },
      accommodation: { ko: "강화 사찰 템플스테이 1박 + 강화 한옥 1박 + 무의도 풀빌라 1박", en: "1 night temple stay in Ganghwa + 1 night Ganghwa Hanok + 1 night Muuido pool villa" },
      timing: { ko: "연중 가능 · 봄(벚꽃)·가을(단풍) 시즌 최강 추천", en: "Year-round · Spring cherry blossoms & Fall foliage are the highlights" },
      price: { ko: "8,200,000원 (2인 기준)", en: "KRW 8,200,000 (for 2 persons)" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "강화도 세계유산 & 사찰 & 템플스테이",
        themeEn: "Ganghwa UNESCO Heritage & Temple Stay",
        items: [
          { time: "10:00 - 11:30", activityKo: "[도착] 인천공항 픽업 & 강화도 이동 (웰컴 브리핑)", activityEn: "[Arrival] Airport pickup & transfer to Ganghwa Island (welcome briefing)" },
          { time: "11:30 - 13:00", activityKo: "[점심] 강화 로컬 한정식 점심 (밴댕이·순무김치)", activityEn: "[Lunch] Ganghwa local Korean set meal (local specialties)" },
          { time: "13:00 - 15:00", activityKo: "[유산] 강화 고인돌 유적지 (UNESCO 세계문화유산) 탐방", activityEn: "[Heritage] Ganghwa UNESCO Dolmen site exploration" },
          { time: "15:00 - 17:00", activityKo: "[사찰] 전등사 도착 & 템플스테이 오리엔테이션·발우공양 체험", activityEn: "[Temple] Arrive Jeondeungsa & temple stay orientation + bowl meal experience" },
          { time: "17:00 - 19:00", activityKo: "[체험] 사찰 저녁 예불 & 스님과의 차담", activityEn: "[Experience] Evening prayer ceremony & tea ceremony with monk" },
          { time: "21:00", activityKo: "[취침] 사찰 입정·취침", activityEn: "[Rest] Temple meditation & sleep" },
        ]
      },
      {
        day: 2,
        themeKo: "새벽 예불 & 명상 트레킹 & 레트로",
        themeEn: "Dawn Prayer & Meditation Trek & Retro",
        items: [
          { time: "04:00 - 05:30", activityKo: "[새벽] 전등사 새벽 예불 참여 & 108배 명상 수행", activityEn: "[Dawn] Jeondeungsa dawn prayer ceremony & 108 bows meditation practice" },
          { time: "07:00 - 08:00", activityKo: "[조식] 사찰 아침 죽 공양 & 템플스테이 회향식", activityEn: "[Breakfast] Temple morning porridge & templestay closing ceremony" },
          { time: "09:30 - 12:00", activityKo: "[트레킹] 강화 나들길 2코스 — 고려 왕릉 명상 트레킹", activityEn: "[Trekking] Ganghwa Nadeul-gil Trail — Goryeo Royal Tomb meditation trekking" },
          { time: "12:00 - 13:30", activityKo: "[미식] 강화 밴댕이·꽃게탕 프리미엄 점심", activityEn: "[Dining] Ganghwa local specialty raw fish & blue crab stew premium lunch" },
          { time: "13:30 - 17:00", activityKo: "[레트로·체험] 조양방직 레트로 카페 & 소창체험관 직물 공예", activityEn: "[Retro] Joyangbanjik retro café & Sochang textile craft workshop" },
          { time: "저녁", activityKo: "[숙박] 강화 한옥 게스트하우스 체크인 & 석식", activityEn: "[Stay] Ganghwa Hanok guesthouse check-in & dinner" },
        ]
      },
      {
        day: 3,
        themeKo: "무의도 이동 & 해상 트레킹 & 풀빌라",
        themeEn: "Muuido Transfer & Marine Trail & Pool Villa",
        items: [
          { time: "08:00 - 09:30", activityKo: "[조식] 한옥 전통 조식 & 강화 동막해변 갯벌 체험", activityEn: "[Breakfast] Hanok traditional breakfast & Dongmak Beach tidal flat experience" },
          { time: "09:30 - 11:30", activityKo: "[이동] 무의도 차량 페리 탑승 (잠진도 → 무의도)", activityEn: "[Transit] Vehicle ferry to Muuido island (Jamjindo → Muuido)" },
          { time: "11:30 - 13:00", activityKo: "[점심] 하나개 해수욕장 로컬 해산물 점심 — 꽃게·해물뚝배기", activityEn: "[Lunch] Hanaegae Beach local seafood — crab & seafood hot pot" },
          { time: "13:00 - 15:30", activityKo: "[해상 트레킹] 소무의도 '무의바다누리길' 해안 데크 트레킹", activityEn: "[Marine Trail] Somuuido 'Sea Nuri Trail' coastal deck trekking" },
          { time: "15:30 - 17:30", activityKo: "[미식] 로컬 어부·해녀가 당일 조업한 싱싱한 활어회 & 장어 구이 다이닝", activityEn: "[Dining] Fresh raw fish & grilled eel dining caught that day by local fishermen/Haenyeo" },
          { time: "17:30 - 20:00", activityKo: "[체험] 섬 전통 선상 낚시 체험 또는 프라이빗 해산물 찜 다이닝", activityEn: "[Experience] Island traditional boat fishing or private seafood steam dining" },
          { time: "20:00 - 22:00", activityKo: "[힐링] 풀빌라 프라이빗 온수풀 수영 & 밤바다 파도 소리와 함께하는 야간 스파 힐링", activityEn: "[Wellness] Private heated pool swim & night spa healing with the soothing sound of ocean waves" },
        ]
      },
      {
        day: 4,
        themeKo: "갯벌 체험 & 해녀 문화 & 귀환",
        themeEn: "Tidal Flat & Haenyeo Culture & Return",
        items: [
          { time: "08:00 - 09:30", activityKo: "[조식] 섬 특산물 전복죽 조식 & 호스트 감사의 글 전달", activityEn: "[Breakfast] Island specialty abalone porridge breakfast & thank you letter from host" },
          { time: "09:30 - 12:00", activityKo: "[체험] 갯벌 체험 — 조개·게 잡기 & 해녀 어업 시연 관람", activityEn: "[Experience] Tidal flat — clam & crab digging & haenyeo diving demonstration" },
          { time: "12:00 - 13:30", activityKo: "[미식] 인천 영종도 오션뷰 카페 브런치 점심", activityEn: "[Dining] Yeongjongdo ocean-view café brunch lunch" },
          { time: "13:30 - 15:00", activityKo: "[추억/작별] 차담 및 여행 소감 나누기 & 공항 프리미엄 샌딩 (4K 시네마틱 영상은 1주일 내 전달)", activityEn: "[Farewell] Tea chat & sharing trip impressions, premium airport drop-off (4K cinematic video delivered within 1 week)" },
        ]
      }
    ]
  },
  {
    id: "course-3",
    type: "2-night",
    titleKo: "세상과 단절된 고요, 섬",
    titleEn: "Island Silence, Disconnected from the World",
    subtitleKo: "무의도의 원시 자연과 영종도의 황홀한 낙조, 섬이 주는 완벽한 고립감 속에서",
    subtitleEn: "In the pristine nature of Muuido and the breathtaking sunset of Yeongjong — perfect isolation in island solitude",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      { title: "무의도 원시 해안 트레킹", desc: "개발의 손길이 닿지 않은 무의도와 소무의도의 원시 해안길을 따라 걸으며 도시의 모든 소음에서 완전히 벗어납니다. 바다 위에 세워진 해상탐방로를 걷는 순간, 세상과 단절된 자신만의 시공간이 열립니다." },
      { title: "영종도 갯벌과 서해의 생명력", desc: "보존된 갯벌 생태계에서 조개를 캐고, 게를 잡으며 대지의 에너지와 직접 연결되는 접지 치유를 경험합니다. 자연의 리듬에 나를 맡기는 순간, 도시에서 지쳐있던 몸과 마음이 회복됩니다." },
      { title: "풀빌라에서 맞이하는 서해 낙조", desc: "프라이빗 풀빌라에서 파도 소리와 함께 서해의 황금빛 일몰을 바라보는 경험은 어떤 고급 호텔도 대체할 수 없습니다." }
    ],
    meaningEn: [
      { title: "Muuido Pristine Coastal Trekking", desc: "Walking along the untouched coastal paths of Muuido and Somuuido, completely escaping all urban noise. The moment you step onto the marine trail built over the sea, your own private time and space — cut off from the world — opens up." },
      { title: "Yeongjong Tidal Flats & The Life of the West Sea", desc: "Digging for clams and catching crabs in a preserved tidal flat ecosystem, experiencing grounding therapy by directly connecting with the earth's energy. As you surrender to nature's rhythm, the exhausted urban mind and body begin to heal." },
      { title: "West Sea Sunset from the Pool Villa", desc: "Watching the golden West Sea sunset from a private pool villa to the sound of ocean waves is an experience no luxury hotel can replicate. In perfect isolation, you feel — perhaps for the first time — what it truly means to rest." }
    ],
    details: {
      duration: { ko: "2박 3일", en: "2 Nights / 3 Days" },
      accommodation: { ko: "무의도 프라이빗 풀빌라 2박", en: "2 nights at Muuido private pool villa" },
      timing: { ko: "5월~10월 추천 (섬 여행 최적 시즌)", en: "May–October recommended (best season for island travel)" },
      price: { ko: "7,200,000원 (2인 기준)", en: "KRW 7,200,000 (for 2 persons)" },
    },
    schedule: [
      {
        day: 1,
        themeKo: "무의도 도착 & 해상 탐방로 & 선상 낚시",
        themeEn: "Muuido Arrival & Marine Trail & Boat Fishing",
        items: [
          { time: "10:00 - 11:30", activityKo: "[도착] 인천공항 픽업 & 무의도 차량 페리 탑승", activityEn: "[Arrival] Airport pickup & vehicle ferry to Muuido island" },
          { time: "11:30 - 13:00", activityKo: "[점심] 하나개 해수욕장 로컬 해산물 점심 — 꽃게·해물뚝배기", activityEn: "[Lunch] Hanaegae Beach local seafood — crab & seafood hot pot" },
          { time: "13:00 - 15:30", activityKo: "[탐방] 무의도 해상관광탐방로 (바다 위 데크 1.4km) & 해변 자유 시간", activityEn: "[Trail] Muuido Marine Tourism Trail (1.4km sea deck path) & beach free time" },
          { time: "15:30 - 17:30", activityKo: "[미식] 로컬 어부·해녀가 당일 조업한 싱싱한 활어회 & 장어 구이 다이닝", activityEn: "[Dining] Fresh raw fish & grilled eel dining caught that day by local fishermen/Haenyeo" },
          { time: "17:30 - 20:00", activityKo: "[체험] 섬 전통 선상 낚시 체험 또는 프라이빗 해산물 찜 다이닝", activityEn: "[Experience] Island traditional boat fishing or private seafood steam dining" },
          { time: "20:00 - 22:00", activityKo: "[힐링] 풀빌라 프라이빗 온수풀 수영 & 밤바다 파도 소리와 함께하는 야간 스파 힐링", activityEn: "[Wellness] Private heated pool swim & night spa healing with the soothing sound of ocean waves" },
        ]
      },
      {
        day: 2,
        themeKo: "소무의도 트레킹 & 갯벌 체험 & 영종도 이동",
        themeEn: "Somuuido Trekking & Tidal Flat & Yeongjong Transfer",
        items: [
          { time: "07:00 - 08:30", activityKo: "[조식] 섬 전복죽 조식 & 이른 아침 해안 산책", activityEn: "[Breakfast] Island abalone porridge & early morning coastal walk" },
          { time: "08:30 - 11:00", activityKo: "[트레킹] 소무의도 '무의바다누리길' 원시 해안 트레킹 & 일출 포인트", activityEn: "[Trekking] Somuuido 'Sea Nuri Trail' — pristine coastal trekking & sunrise viewpoint" },
          { time: "11:00 - 13:00", activityKo: "[체험] 갯벌 체험 — 조개·게 잡기 & 해녀 어업 시연 관람", activityEn: "[Experience] Tidal flat — clam & crab digging & haenyeo diving demonstration" },
          { time: "13:00 - 14:30", activityKo: "[점심] 섬 해산물 정식 & 실미도 방문 (영화 실미도 배경, 해안 절경)", activityEn: "[Lunch] Island seafood set & Silmido visit (film backdrop, coastal scenery)" },
          { time: "14:30 - 16:30", activityKo: "[이동] 영종도 이동 & 마시안 해변 카페거리 자유 시간", activityEn: "[Transit] Transfer to Yeongjongdo & free time at Masian Beach Café Street" },
          { time: "16:30 - 18:00", activityKo: "[액티비티] 영종 씨사이드 레일바이크 — 바다 뷰 레일바이크 체험", activityEn: "[Activity] Yeongjong Seaside Rail Bike — ocean-view rail biking" },
          { time: "18:00 - 22:00", activityKo: "[미식·숙박] 을왕리 조개구이 저녁 & 풀빌라 프라이빗 온수풀 스파 힐링", activityEn: "[Dining & Stay] Eurwang-ri grilled clam dinner & pool villa private hot spring spa healing" },
        ]
      },
      {
        day: 3,
        themeKo: "영종도 & 귀환",
        themeEn: "Yeongjong & Return",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 섬 특산물 전복죽 조식 & 호스트 감사의 글 전달", activityEn: "[Breakfast] Island specialty abalone porridge breakfast & thank you letter from host" },
          { time: "10:30 - 12:30", activityKo: "[체험] 소무의도 인도교 걷기 & 떼무리 도보 해안길 산책", activityEn: "[Activity] Walking across Somuuido pedestrian bridge & trekking along Taemuri coastal path" },
          { time: "12:30 - 14:00", activityKo: "[미식] 인천 영종도 오션뷰 카페 브런치 점심", activityEn: "[Dining] Yeongjongdo ocean-view café brunch lunch" },
          { time: "14:00 - 15:30", activityKo: "[추억/작별] 3일간의 스냅 리뷰 및 공항 프라이빗 샌딩 (4K 시네마틱 영상은 1주일 내 전달)", activityEn: "[Farewell] Snap photo review & private airport send-off (4K cinematic video delivered within 1 week)" },
        ]
      }
    ]
  },
];
