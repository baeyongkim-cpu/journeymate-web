export interface SubDestination {
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  price: string;
}

export interface Destination {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  tags: string[];
  tagsEn: string[];
  category: 'incheon-core' | 'beyond-incheon';
  subDestinations: SubDestination[];
}

export interface DualTrackExperience {
  id: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  icon: string;
}

export const parentTrack: DualTrackExperience[] = [
  { id: 'island-trek', titleKo: '섬 트레킹 & 바다 명상', titleEn: 'Island Trekking & Ocean Meditation', descKo: '무의도 해안길을 걸으며 파도 소리와 함께하는 온전한 휴식', descEn: 'Walk along Muuido coastal trails with the sound of waves for pure relaxation', icon: '🏝️' },
  { id: 'hanok-dado', titleKo: '한옥 다도 체험', titleEn: 'Traditional Hanok Tea Ceremony', descKo: '고즈넉한 한옥에서 즐기는 전통 다도와 명상의 시간', descEn: 'Enjoy traditional tea ceremony and meditation in a serene Hanok', icon: '🍵' },
  { id: 'spa-healing', titleKo: '프리미엄 스파 & 힐링', titleEn: 'Premium Spa & Healing', descKo: '최고급 스파에서 몸과 마음을 재충전하는 프라이빗 힐링', descEn: 'Recharge body and mind at a premium private spa', icon: '💆' },
];

export const kidsTrack: DualTrackExperience[] = [
  { id: 'swimming', titleKo: '1:1 수영 레슨', titleEn: '1:1 Swimming Lesson', descKo: '전문 강사와 함께하는 안전하고 즐거운 수영 체험', descEn: 'Safe and fun swimming experience with a professional instructor', icon: '🏊' },
  { id: 'k-dessert', titleKo: 'K-디저트 클래스', titleEn: 'K-Dessert Baking Class', descKo: '앙금플라워, 떡 만들기 등 한국 전통 디저트 체험', descEn: 'Experience Korean traditional desserts like rice cake and flower cream', icon: '🧁' },
  { id: 'mudflat', titleKo: '갯벌 생태 탐방', titleEn: 'Mudflat Eco Adventure', descKo: '서해안 갯벌에서 게, 조개를 잡으며 자연과 교감', descEn: 'Catch crabs and clams on the west coast mudflats', icon: '🦀' },
];

export const destinations: Destination[] = [
  {
    id: 'songdo',
    title: '송도국제도시',
    titleEn: 'Songdo International City',
    description: '미래형 스카이라인과 자연이 어우러진 글로벌 시티의 정수.',
    descriptionEn: 'The essence of a global city where futuristic skylines meet nature.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Songdo_Central_Park_in_2021.jpg',
    tags: ['미래도시', '글로벌'],
    tagsEn: ['Future City', 'Global'],
    category: 'incheon-core',
    subDestinations: [
      { name: '센트럴파크 보트', nameEn: 'Central Park Boat', desc: '도심 속 호수에서 즐기는 프라이빗 보팅', descEn: 'Private boating on the urban lake', price: 'Price on Request' },
      { name: 'G타워 전망대', nameEn: 'G-Tower Observatory', desc: '송도의 파노라마 뷰를 한눈에 조망', descEn: 'Panoramic views of Songdo', price: 'Price on Request' },
      { name: '송도 커낼워크', nameEn: 'Songdo Canal Walk', desc: '유럽풍 수로를 따라 걷는 여유로운 산책', descEn: 'Leisurely stroll along the European-style canal', price: 'Price on Request' }
    ]
  },
  {
    id: 'gaehangro',
    title: '개항장거리',
    titleEn: 'Gaehangro (Open Port)',
    description: '130년의 역사가 살아숨쉬는 근대 문화의 중심지.',
    descriptionEn: 'The center of modern culture breathing with 130 years of history.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Chinatown%2C_incheon_20230430_002.jpg',
    tags: ['역사', '레트로'],
    tagsEn: ['History', 'Retro'],
    category: 'incheon-core',
    subDestinations: [
      { name: '130년 헤리티지 워크', nameEn: '130-Year Heritage Walk', desc: '근대 건축물 사이를 거니는 시간 여행', descEn: 'Time travel walking between modern architecture', price: 'Price on Request' },
      { name: '차이나타운', nameEn: 'Chinatown', desc: '한국 최초의 차이나타운에서 즐기는 미식', descEn: 'Gastronomy in Korea\'s first Chinatown', price: 'Price on Request' },
      { name: '동화마을', nameEn: 'Fairy Tale Village', desc: '골목마다 펼쳐지는 아름다운 벽화 마을', descEn: 'Beautiful mural village spreading across alleys', price: 'Price on Request' }
    ]
  },
  {
    id: 'sinpo',
    title: '신포국제시장',
    titleEn: 'Sinpo Traditional Market',
    description: '한국의 다채로운 로컬 미식과 문화를 체험할 수 있는 곳.',
    descriptionEn: 'Experience diverse local gastronomy and culture of Korea.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Sinpo-market_191123001.jpg',
    tags: ['미식', '로컬'],
    tagsEn: ['Food', 'Local'],
    category: 'incheon-core',
    subDestinations: [
      { name: '시장 미식 투어', nameEn: 'Market Food Tour', desc: '닭강정부터 만두까지 로컬 맛집 탐방', descEn: 'Explore local delicacies from sweet sour chicken to dumplings', price: 'Price on Request' },
      { name: 'K-디저트 클래스', nameEn: 'K-Dessert Class', desc: '전통 간식을 직접 만들어보는 특별한 시간', descEn: 'Special time making traditional snacks yourself', price: 'Price on Request' },
      { name: '로컬 쿠킹', nameEn: 'Local Cooking', desc: '신선한 식재료로 요리하는 한국 가정식', descEn: 'Cooking Korean home meals with fresh ingredients', price: 'Price on Request' }
    ]
  },
  {
    id: 'islands',
    title: '프라이빗 섬 (무의/신시모도)',
    titleEn: 'Private Island (Muuido/Sinsimodo)',
    description: '바쁜 일상에서 벗어나 자연과 호흡하는 완벽한 휴식처.',
    descriptionEn: 'A perfect retreat to breathe with nature away from busy life.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Muuido_Island_from_Ferry_Dock.jpg',
    tags: ['자연', '힐링'],
    tagsEn: ['Nature', 'Healing'],
    category: 'incheon-core',
    subDestinations: [
      { name: '해변 바비큐', nameEn: 'Beach BBQ', desc: '프라이빗 비치에서 즐기는 럭셔리 바비큐', descEn: 'Luxury BBQ enjoyed at a private beach', price: 'Price on Request' },
      { name: '해안 트레킹', nameEn: 'Coastal Trekking', desc: '아름다운 해안선을 따라 걷는 힐링 코스', descEn: 'Healing course walking along the beautiful coastline', price: 'Price on Request' },
      { name: '선셋 명상', nameEn: 'Sunset Meditation', desc: '황홀한 일몰을 바라보며 마음을 비우는 시간', descEn: 'Time to clear mind watching the ecstatic sunset', price: 'Price on Request' }
    ]
  },
  {
    id: 'grand-tour',
    title: '한국일주 (14박 15일)',
    titleEn: 'Grand Tour of Korea',
    description: '단순한 관광을 넘어 한국의 삶과 역사, 자연을 깊이 체험하며 진정한 나를 찾는 15일간의 여정.',
    descriptionEn: 'A 15-day journey beyond simple sightseeing to deeply experience Korean life, history, and nature, and to find your true self.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2000&auto=format&fit=crop',
    tags: ['의미찾기', '로컬라이프', '전국일주'],
    tagsEn: ['Self-Discovery', 'Local Life', 'Grand Tour'],
    category: 'beyond-incheon',
    subDestinations: [
      { name: '인천·서울', nameEn: 'Incheon & Seoul', desc: '과거와 미래의 교차점', descEn: 'Intersection of past and future', price: 'Price on Request' },
      { name: '단양·속초·동해안', nameEn: 'East Coast', desc: '자연 속 명상과 치유', descEn: 'Meditation and healing in nature', price: 'Price on Request' },
      { name: '경주·울산·부산', nameEn: 'Gyeongsang', desc: '천년의 역사와 해양 문화', descEn: 'Millennium history and maritime culture', price: 'Price on Request' },
      { name: '여수·순천·진도', nameEn: 'Jeolla South', desc: '남도 낭만과 생태', descEn: 'Southern romance and ecology', price: 'Price on Request' },
      { name: '제주도', nameEn: 'Jeju', desc: '해녀 문화와 화산섬 힐링', descEn: 'Haenyeo culture and volcanic island healing', price: 'Price on Request' },
      { name: '광주·전주·대전', nameEn: 'Jeolla North & Chungcheong', desc: '예술, 선비정신, 과학', descEn: 'Art, scholar spirit, and science', price: 'Price on Request' }
    ]
  }
];
