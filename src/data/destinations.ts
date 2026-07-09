export type SubDestination = {
  name: string;
  nameEn?: string;
  desc: string;
  descEn?: string;
  priceValue: number;
};

export type Destination = {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  tags: string[];
  tagsEn?: string[];
  subDestinations: SubDestination[];
};

export const destinations: Destination[] = [
  {
    id: "incheon",
    title: "인천 (Incheon)",
    titleEn: "Incheon",
    description: "항구 도시의 개방성과 프라이빗한 섬의 고요함을 모두 갖춘 다채로운 매력.",
    descriptionEn: "A colorful charm combining the openness of a port city and the tranquility of private islands.",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop",
    tags: ["로컬", "섬", "레트로"],
    tagsEn: ["Local", "Island", "Retro"],
    subDestinations: [
      { name: "개항로 (Gaehangro)", nameEn: "Gaehangro", desc: "100년 전 과거로 돌아간 듯한 레트로 감성 스냅", descEn: "Retro-style snapshot feeling like a trip back 100 years", priceValue: 200 },
      { name: "차이나타운 (Chinatown)", nameEn: "Chinatown", desc: "이국적인 붉은 물결 속 식도락 브이로그", descEn: "Food vlog amidst exotic red waves", priceValue: 250 },
      { name: "신포시장 (Sinpo Market)", nameEn: "Sinpo Market", desc: "로컬 시장의 활기와 먹방 촬영", descEn: "Mukbang filming with local market energy", priceValue: 150 },
      { name: "인천 근교 섬 투어", nameEn: "Island Tour near Incheon", desc: "인천에서 쉽게 갈 수 있는 고즈넉한 섬 배경 1박 2일 스냅 (숙박 포함)", descEn: "1 Night 2 Days snapshot at a quiet island near Incheon (Stay included)", priceValue: 450 },
      { name: "예술회관 & 구월동", nameEn: "Arts Center & Guwol-dong", desc: "도심 속 트렌디한 시티팝 감성 촬영", descEn: "Trendy city-pop vibe shooting in downtown", priceValue: 200 }
    ]
  },
  {
    id: "seoul",
    title: "서울 (Seoul)",
    titleEn: "Seoul",
    description: "전통과 최첨단이 공존하는 글로벌 메가시티 중심에서의 기록.",
    descriptionEn: "Memories in the center of a global megacity where tradition meets high-tech.",
    image: "https://images.unsplash.com/photo-1546874177-9e664107314e?q=80&w=2069&auto=format&fit=crop",
    tags: ["시티투어", "고궁", "트렌드"],
    tagsEn: ["City Tour", "Palaces", "Trend"],
    subDestinations: [
      { name: "경복궁 & 북촌", nameEn: "Gyeongbokgung & Bukchon", desc: "프리미엄 한복 스냅 (한복 대여 포함)", descEn: "Premium Hanbok snapshot (rental included)", priceValue: 250 },
      { name: "강남 & 청담", nameEn: "Gangnam & Cheongdam", desc: "K-Pop 아이돌 스타일 뷰티 & 럭셔리 브이로그", descEn: "K-Pop idol style beauty & luxury vlog", priceValue: 250 },
      { name: "성수동 (Seongsu)", nameEn: "Seongsu", desc: "인더스트리얼 카페 거리 스트릿 스냅", descEn: "Street snap in industrial cafe alleys", priceValue: 200 },
      { name: "한강 공원", nameEn: "Hangang Park", desc: "피크닉 세트와 함께하는 힐링 스냅 (대여 별도)", descEn: "Healing snapshot with picnic set (Rental separate)", priceValue: 180 }
    ]
  },
  {
    id: "busan",
    title: "부산 (Busan)",
    titleEn: "Busan",
    description: "탁 트인 바다와 요트, 그리고 화려한 야경이 어우러지는 해양 도시.",
    descriptionEn: "A marine city blending open seas, yachts, and brilliant night views.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Gwangan_Bridge1.jpg/1280px-Gwangan_Bridge1.jpg",
    tags: ["바다", "야경", "럭셔리"],
    tagsEn: ["Ocean", "Night View", "Luxury"],
    subDestinations: [
      { name: "해운대 요트 스냅", nameEn: "Haeundae Yacht Snap", desc: "요트 위에서 즐기는 프라이빗 럭셔리 촬영", descEn: "Private luxury shoot on a yacht", priceValue: 400 },
      { name: "감천문화마을", nameEn: "Gamcheon Culture Village", desc: "알록달록한 동화 속 마을 골목길 투어", descEn: "Alley tour in a colorful fairytale village", priceValue: 200 },
      { name: "광안리 야경", nameEn: "Gwangalli Night View", desc: "다이아몬드 브릿지 배경 로맨틱 스냅", descEn: "Romantic snapshot with Diamond Bridge background", priceValue: 220 }
    ]
  },
  {
    id: "suwon",
    title: "수원 (Suwon)",
    titleEn: "Suwon",
    description: "세계문화유산 화성의 웅장함과 트렌디한 골목 상권이 공존하는 매력적인 도시.",
    descriptionEn: "Charming city combining the grandeur of World Heritage Hwaseong and trendy alleys.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Hwaseong_Fortress%2C_Suwon%2C_Gyeonggi-do%2C_Republic_of_Korea_%282%29.jpg/1280px-Hwaseong_Fortress%2C_Suwon%2C_Gyeonggi-do%2C_Republic_of_Korea_%282%29.jpg",
    tags: ["성곽", "전통", "K-핫플"],
    tagsEn: ["Fortress", "Tradition", "K-Hotspot"],
    subDestinations: [
      { name: "수원 화성 성곽길", nameEn: "Hwaseong Fortress", desc: "조선 시대 성곽을 배경으로 한 로맨틱 야경 및 한복 스냅", descEn: "Romantic night and Hanbok snap with Joseon fortress background", priceValue: 220 },
      { name: "행궁동 카페거리", nameEn: "Haenggung-dong Cafe Street", desc: "전통 한옥과 모던함이 어우러진 트렌디 브이로그", descEn: "Trendy vlog blending traditional Hanok and modern styles", priceValue: 180 },
      { name: "별마당 도서관 (수원)", nameEn: "Starfield Library", desc: "압도적인 스케일의 서가 배경 인스타그래머블 스냅", descEn: "Instagrammable snapshot with grand bookshelves", priceValue: 150 }
    ]
  },
  {
    id: "paju",
    title: "파주 (Paju)",
    titleEn: "Paju",
    description: "역사적인 DMZ 안보 관광부터 이국적인 감성의 예술 마을까지 다채로운 테마.",
    descriptionEn: "Various themes from historical DMZ tours to exotic art villages.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/ImjingangRailRoad.jpg/1280px-ImjingangRailRoad.jpg",
    tags: ["DMZ", "예술", "평화"],
    tagsEn: ["DMZ", "Art", "Peace"],
    subDestinations: [
      { name: "DMZ & 임진각 평화누리", nameEn: "DMZ & Imjingak", desc: "외국인 필수 코스! 분단의 역사와 평화의 바람개비 언덕", descEn: "Must-visit! History of division and windmill hill of peace", priceValue: 300 },
      { name: "헤이리 예술마을", nameEn: "Heyri Art Village", desc: "독특한 건축물과 갤러리가 가득한 이국적인 예술 스냅", descEn: "Exotic art snapshot filled with unique architecture and galleries", priceValue: 200 },
      { name: "출판단지 지혜의 숲", nameEn: "Forest of Wisdom", desc: "천장까지 닿은 웅장한 책장 배경의 지적인 무드 촬영", descEn: "Intellectual mood shoot with towering bookshelves", priceValue: 180 }
    ]
  },
  {
    id: "gapyeong",
    title: "가평 (Gapyeong)",
    titleEn: "Gapyeong",
    description: "아름다운 자연 속 동화 같은 풍경을 자랑하는 K-Drama 필수 방문지.",
    descriptionEn: "A must-visit K-Drama spot boasting fairytale landscapes in beautiful nature.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Bukhan_River_flowing_through_Gapyeong_%28South_Korea%29.jpg",
    tags: ["자연", "로맨틱", "K-Drama"],
    tagsEn: ["Nature", "Romantic", "K-Drama"],
    subDestinations: [
      { name: "남이섬 (Nami Island)", nameEn: "Nami Island", desc: "드라마 '겨울연가'의 무대, 메타세쿼이아 길 인생샷", descEn: "Stage of 'Winter Sonata', best shot at Metasequoia lane", priceValue: 250 },
      { name: "아침고요수목원", nameEn: "Garden of Morning Calm", desc: "사계절 내내 아름다운 한국적 정원에서의 힐링 브이로그", descEn: "Healing vlog in a Korean garden beautiful all year round", priceValue: 230 },
      { name: "쁘띠프랑스 & 이탈리아 마을", nameEn: "Petite France & Italy Village", desc: "유럽의 작은 마을을 그대로 옮겨놓은 이국적 동화 스냅", descEn: "Exotic fairytale snap replicating small European villages", priceValue: 200 }
    ]
  }
];
