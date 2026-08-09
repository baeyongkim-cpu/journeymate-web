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

export interface Course {
  id: string;
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
  {
    id: "course-1",
    titleKo: "시간이 머무는 곳",
    titleEn: "Where Time Lingers",
    subtitleKo: "과거의 낭만과 미래의 여유가 교차하는, 온전한 쉼을 위한 여정",
    subtitleEn: "A journey for complete rest where past romance and future leisure intersect",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      {
        title: "개항장 근대골목 스냅",
        desc: "130년 전 개항기의 서양식 건축물 사이를 거닐며, 바쁘게 살아온 나의 시간을 잠시 멈추고 흑백 사진 속에 현재의 나를 아날로그 감성으로 기록합니다."
      },
      {
        title: "송도 센트럴파크 프라이빗 보팅",
        desc: "미래 도시의 스카이라인을 배경으로 잔잔한 호수 위를 떠다니며, 전담 호스트가 준비한 샴페인과 함께 오롯이 나와 동행자에게만 집중하는 고요한 시간을 가집니다."
      },
      {
        title: "무의도 해변 일몰 명상",
        desc: "붉게 물드는 서해의 낙조를 바라보며 번잡했던 마음을 비우는 싱잉볼 명상 시간입니다."
      }
    ],
    meaningEn: [
      {
        title: "Gaehangro Heritage Snap",
        desc: "Stroll among 130-year-old western-style buildings, pausing your busy life to capture your present self in analog black-and-white photos."
      },
      {
        title: "Songdo Central Park Private Boating",
        desc: "Float on a tranquil lake against a futuristic skyline. With champagne prepared by your host, enjoy a quiet time focused entirely on yourself and your companion."
      },
      {
        title: "Muuido Beach Sunset Meditation",
        desc: "A singing bowl meditation session to empty your cluttered mind while watching the crimson sunset over the West Sea."
      }
    ],
    details: {
      duration: { ko: "2박 3일", en: "3 Days, 2 Nights" },
      accommodation: { ko: "경원재 앰배서더 인천 (전통 한옥 호텔의 고풍스러운 독채 럭셔리)", en: "Gyeongwonjae Ambassador (Luxurious Traditional Hanok)" },
      timing: { ko: "봄(4~5월), 가을(9~10월)", en: "Spring (Apr-May), Autumn (Sep-Oct)" },
      price: { 
        ko: "예상가 6,400,000원 (2인 기준)", 
        en: "Est. ₩6,400,000 (for 2 pax)" 
      }
    },
    schedule: [
      {
        day: 1,
        themeKo: "송도 미래도시 & 프라이빗 수변 차밍",
        themeEn: "Songdo Future & Waterway",
        items: [
          { time: "12:00 - 13:30", activityKo: "[환영] 인천공항/송도 입국 픽업 & 경원재 앰배서더 한옥호텔 체크인 & 웰컴 다과", activityEn: "[Welcome] Airport/Songdo pickup, check-in at Gyeongwonjae Ambassador Hanok Hotel, welcome tea" },
          { time: "13:30 - 15:00", activityKo: "[미식] 송도 한옥마을 정갈한 고급 한정식 점심 식사", activityEn: "[Dining] Neat premium Korean table d'hote lunch at Songdo Hanok Village" },
          { time: "15:00 - 16:30", activityKo: "[투어] 송도 G타워 33층 전망대 & 인천 스마트시티 관제센터 체험 (스마트도시 교육)", activityEn: "[Tour] Songdo G-Tower 33F Observatory & Incheon Smart City Control Center experience (Smart City Education)" },
          { time: "16:30 - 18:00", activityKo: "[체험] 송도 센트럴파크 프라이빗 문보트 / 구르미보트 승선 (음악 & 음료 서비스)", activityEn: "[Activity] Private Moon Boat / Foating Boat ride at Songdo Central Park (Music & drinks included)" },
          { time: "18:00 - 20:00", activityKo: "[미식] 센트럴파크 오션뷰 프라이빗 럭셔리 다이닝", activityEn: "[Dining] Private luxury dining with Central Park view" },
          { time: "20:00 - 22:00", activityKo: "[야경] 송도 수변 야경 산책 & 경원재 한옥 히노끼탕 1:1 웰니스 아로마 족욕 힐링", activityEn: "[Wellness] Songdo waterfront night walk & 1:1 aroma foot spa healing at Hanok Hinoki bath" }
        ]
      },
      {
        day: 2,
        themeKo: "130년 개항장 인문학 & 전통시장 K-쿠킹",
        themeEn: "1883 Open Port & K-Heritage",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 경원재 궁중 수라상 아침 식사", activityEn: "[Breakfast] Gyeongwonjae royal breakfast table" },
          { time: "10:30 - 12:30", activityKo: "[교육/체험] 개항장 근대의상(모던걸/모던보이) 맞춤 대여 & 1:1 프라이빗 스냅 촬영", activityEn: "[Experience] Custom modern-port attire rental & 1:1 private snap photo shoot" },
          { time: "12:30 - 14:00", activityKo: "[미식] 130년 전통 신포국제시장 미식 탐방 (신포 닭강정, 원조 쫄면, 공갈빵)", activityEn: "[Dining] Gastronomy tour of 130-year-old Sinpo International Market (Dakgangjeong, Jjolmyeon, etc.)" },
          { time: "14:00 - 16:00", activityKo: "[클래스] 인천 전통 떡/K-디저트 (앙금플라워 떡케이크) 1:1 원데이 쿠킹 클래스", activityEn: "[Class] Incheon traditional rice cake/K-dessert (Bean paste flower cake) 1:1 one-day cooking class" },
          { time: "16:00 - 18:00", activityKo: "[인문학] 대불호텔(한국 최초 호텔) & 개항장 박물관 도슨트 호스트 스토리텔링", activityEn: "[Education] Storytelling docent tour at Daebul Hotel (Korea's 1st hotel) & Open Port Museum" },
          { time: "18:00 - 20:00", activityKo: "[미식] 개항장 레트로 한옥 퓨전 한식 코스 다이닝", activityEn: "[Dining] Retro Hanok fusion Korean course dining at Open Port area" },
          { time: "20:00 - 22:00", activityKo: "[야경] 상상플랫폼 야간 미디어아트 라이브 쇼 & 자유 거닐기", activityEn: "[Night] Sangsang Platform night media art live show & leisure walk" }
        ]
      },
      {
        day: 3,
        themeKo: "영종도 해안 석양 & 작별",
        themeEn: "Sunset & Farewell",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 경원재 한옥 조식 & 1:1 호스트 감사 인사를 담을 롤링페이퍼 전달", activityEn: "[Breakfast] Hanok breakfast & 1:1 farewell rolling paper with host's appreciation" },
          { time: "10:30 - 12:30", activityKo: "[체험] 영종도 해안 레일바이크 타고 서해 바다바람 감상", activityEn: "[Activity] Yeongjongdo coastal rail bike ride enjoying West Sea ocean breeze" },
          { time: "12:30 - 14:00", activityKo: "[미식] 영종도 칼국수 & 해산물 파전 오션뷰 점심", activityEn: "[Dining] Yeongjongdo noodle soup & seafood pancake lunch with ocean view" },
          { time: "14:00 - 15:30", activityKo: "[추억/작별] 3일간의 추억 공유 및 공항 배웅 (4K 시네마틱 영상은 여행 종료 후 1주일 내 전달)", activityEn: "[Farewell] Share memories of 3 days & airport send-off (4K cinematic video delivered within 1 week after trip)" }
        ]
      }
    ]
  },
  {
    id: "course-2",
    titleKo: "내면의 소리를 듣는 고요",
    titleEn: "Whispers of Serenity",
    subtitleKo: "번잡한 일상에서 벗어나 맑은 정신과 에너지를 채우는 웰니스 여정",
    subtitleEn: "A wellness journey to recharge your mind and energy away from the daily hustle",
    image: "https://images.unsplash.com/photo-1553159925-02b2e24f471d?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      {
        title: "전등사 프라이빗 템플스테이",
        desc: "새벽 예불의 맑은 종소리와 함께 깨어나 숲속을 포행하며, 복잡한 현대 사회에서 잊고 지냈던 내면의 진정한 목소리에 귀를 기울입니다."
      },
      {
        title: "다도(茶道) 마스터 클래스",
        desc: "차를 우리고 마시는 일련의 정적인 과정을 통해, 기다림의 미학을 배우고 감각을 깨우는 마음챙김(Mindfulness)을 경험합니다."
      },
      {
        title: "신포국제시장 심야 미식 탐험",
        desc: "고요한 낮의 일정과 대비되게, 늦은 밤 시장의 활기찬 에너지를 느끼며 로컬 상인들의 따뜻한 인심과 사람 냄새 나는 정을 나눕니다."
      }
    ],
    meaningEn: [
      {
        title: "Jeondeungsa Private Templestay",
        desc: "Wake up to the clear sound of morning temple bells and walk through the forest, listening to your true inner voice forgotten in modern society."
      },
      {
        title: "Tea Ceremony Masterclass",
        desc: "Through the serene process of brewing and drinking tea, learn the aesthetics of waiting and experience mindfulness that awakens your senses."
      },
      {
        title: "Sinpo Market Midnight Foodie Tour",
        desc: "In contrast to the quiet day, feel the vibrant energy of the late-night market and share the warmth and humanity of local merchants."
      }
    ],
    details: {
      duration: { ko: "3박 4일", en: "4 Days, 3 Nights" },
      accommodation: { ko: "파라다이스시티 인천 & 전등사 VIP 템플 룸", en: "Paradise City & Jeondeungsa VIP Temple Room" },
      timing: { ko: "사계절 내내 (특히 눈 내리는 겨울 추천)", en: "All Year (Highly recommended in Snowy Winter)" },
      price: { 
        ko: "예상가 8,200,000원 (2인 기준)", 
        en: "Est. ₩8,200,000 (for 2 pax)" 
      }
    },
    schedule: [
      {
        day: 1,
        themeKo: "파라다이스 스파 & 씨메르 웰니스",
        themeEn: "Luxury Wellness",
        items: [
          { time: "13:00 - 14:30", activityKo: "[환영] 파라다이스시티 디럭스 스위트 체크인 & 프라이빗 웰컴 칵테일", activityEn: "[Welcome] Paradise City deluxe suite check-in & private welcome cocktail" },
          { time: "14:30 - 17:30", activityKo: "[스파] 파라다이스 씨메르(CIMER) 럭셔리 찜질스파 & 1인 사우나/세신 케어", activityEn: "[Spa] Paradise Cimer luxury Jjimjil spa & private sauna/scrub care" },
          { time: "17:30 - 19:30", activityKo: "[미식] 파라다이스 럭셔리 다이닝 (파인다이닝 한식)", activityEn: "[Dining] Paradise luxury fine-dining (Korean cuisine)" },
          { time: "19:30 - 21:30", activityKo: "[야간] 아트스페이스 아트투어 & 아트플라자 야간 조명 산책", activityEn: "[Tour] Art Space art tour & Art Plaza night lighting stroll" }
        ]
      },
      {
        day: 2,
        themeKo: "인천 뷰티 & 전통시장 심야 미식",
        themeEn: "Beauty & Night Market",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 파라다이스시티 온더플레이트 프라이빗 뷔페 조식", activityEn: "[Breakfast] Paradise City 'On the Plate' private buffet breakfast" },
          { time: "10:30 - 13:00", activityKo: "[뷰티] 인천 K-뷰티 스킨케어 & 1:1 맞춤 퍼스널컬러/메이크업 컨설팅", activityEn: "[Experience] Incheon K-beauty skin care & 1:1 custom personal color/makeup consulting" },
          { time: "13:00 - 14:30", activityKo: "[미식] 송도 프리미엄 전복/해물 한정식 점심", activityEn: "[Dining] Premium abalone/seafood Korean table d'hote lunch in Songdo" },
          { time: "14:30 - 17:30", activityKo: "[웰니스] 인천 소래습지 생태공원 족욕 체험 & 천연 염전 힐링 산책", activityEn: "[Wellness] Incheon Sorae Wetland Ecological Park foot spa & salt pond healing walk" },
          { time: "17:30 - 20:30", activityKo: "[야시장] 모래내/신포 야시장 심야 K-스트리트 푸드 미식 도슨트 투어", activityEn: "[Tour] Late-night K-street food gastronomy docent tour at Moraenae/Sinpo night markets" }
        ]
      },
      {
        day: 3,
        themeKo: "강화 전등사 VIP 템플스테이 & 전통 다도",
        themeEn: "Temple & Tea Meditation",
        items: [
          { time: "10:00 - 11:30", activityKo: "[이동] 강화도로 이동 & 강화 한옥 마을 경관 감상", activityEn: "[Transfer] Drive to Ganghwa Island, enjoying scenic views of Ganghwa Hanok Village" },
          { time: "11:30 - 13:00", activityKo: "[미식] 강화 특산물 약쑥 삼계탕 / 곤드레 밥상 점심", activityEn: "[Dining] Ganghwa local specialty mugwort ginseng chicken soup / thistle rice lunch" },
          { time: "13:00 - 14:30", activityKo: "[체험] 강화 전등사 VIP 독채 템플스테이 입재식 & 수련복 착용", activityEn: "[Experience] Ganghwa Jeondeungsa VIP private templestay orientation & uniform change" },
          { time: "14:30 - 16:30", activityKo: "[교육/다도] 전등사 스님과 함께하는 1:1 전통 다도 클래스 & 명상 (Meditation)", activityEn: "[Class] 1:1 traditional tea ceremony class & meditation with Jeondeungsa monk" },
          { time: "16:30 - 18:00", activityKo: "[사찰] 전등사 천년 사찰 울창한 숲길 걷기 명상 및 타종 체험", activityEn: "[Wellness] Walking meditation through thousand-year temple forest & bell tolling experience" },
          { time: "18:00 - 19:30", activityKo: "[미식] 정갈한 사찰 발우공양 저녁 식사", activityEn: "[Dining] Clean and traditional Buddhist temple food dinner (Barugongyang)" },
          { time: "19:30 - 21:00", activityKo: "[힐링] 전등사 마당 별빛 명상 & 1:1 호스트 인생 소통", activityEn: "[Wellness] Starlight meditation at temple yard & 1:1 life discussion with host" }
        ]
      },
      {
        day: 4,
        themeKo: "강화 마니산 기운 & 작별",
        themeEn: "Energy & Farewell",
        items: [
          { time: "06:00 - 07:30", activityKo: "[명상] 산사 아침 예불 & 스님과의 1:1 차담 (Tea-Time)", activityEn: "[Wellness] Morning Buddhist service & 1:1 tea chat with monk" },
          { time: "08:00 - 09:30", activityKo: "[조식] 사찰 아침 죽 공양 & 템플스테이 회향식", activityEn: "[Breakfast] Temple morning porridge breakfast & templestay completion ceremony" },
          { time: "09:30 - 12:00", activityKo: "[체험] 강화 루지(Luge) 레저 체험 또는 전등사 소나무 숲 산림욕", activityEn: "[Experience] Ganghwa Luge leisure experience or pine forest forest bathing" },
          { time: "12:00 - 13:30", activityKo: "[미식] 강화 밴댕이/꽃게탕 프리미엄 점심", activityEn: "[Dining] Ganghwa local specialty raw fish salad or blue crab stew lunch" },
          { time: "13:30 - 15:00", activityKo: "[추억/작별] 차담 및 여행 소감 나누기 & 공항 프리미엄 샌딩 (4K 시네마틱 영상은 1주일 내 전달)", activityEn: "[Farewell] Tea chat & sharing trip impressions, premium airport drop-off (4K cinematic video delivered within 1 week)" }
        ]
      }
    ]
  },
  {
    id: "course-3",
    titleKo: "세상과 단절된 고요,\n섬에서의 시간",
    titleEn: "Island Retreat",
    subtitleKo: "자연의 소리와 별빛에 기대어 잠드는 온전한 쉼의 여정",
    subtitleEn: "A journey of complete rest, falling asleep to the sounds of nature and starlight",
    image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=2000&auto=format&fit=crop",
    meaningKo: [
      {
        title: "덕적도/무의도 해안 트레킹",
        desc: "일상의 바쁜 시계를 잠시 내려놓고, 파도 소리와 바람의 숨결에 맞춰 나만의 속도로 걷는 시간은 깊은 내면의 치유를 돕습니다."
      },
      {
        title: "별자리 관측과 모닥불 토크",
        desc: "인공 불빛이 없는 섬의 밤, 쏟아지는 별빛 아래 모닥불을 피웁니다. 호스트가 준비한 뱅쇼를 마시며 깊고 진솔한 대화를 나눕니다."
      },
      {
        title: "로컬 해녀/어부 다이닝",
        desc: "섬에서 당일 갓 잡은 가장 신선한 식재료로 차려진 프라이빗 다이닝을 통해, 바다가 주는 완벽하고 건강한 미식을 경험합니다."
      }
    ],
    meaningEn: [
      {
        title: "Island Coastal Trekking",
        desc: "Put down your busy clock and walk at your own pace to the sound of waves and breath of the wind, facilitating deep inner healing."
      },
      {
        title: "Stargazing & Campfire Talk",
        desc: "On an island night without artificial lights, light a campfire under the pouring stars. Enjoy vin chaud prepared by your host and share heartfelt conversations."
      },
      {
        title: "Local Haenyeo/Fisherman Dining",
        desc: "Experience perfect and healthy gastronomy from the sea through private dining prepared with the freshest ingredients caught that day on the island."
      }
    ],
    details: {
      duration: { ko: "2박 3일 (섬에서의 온전한 2박)", en: "3 Days, 2 Nights (Full Island Stay)" },
      accommodation: { ko: "섬 내 바다 전망 프라이빗 독채 풀빌라", en: "Private Ocean-View Pool Villa on the Island" },
      timing: { ko: "늦봄(5~6월), 초가을(9~10월)", en: "Late Spring (May-Jun), Early Autumn (Sep-Oct)" },
      price: { 
        ko: "예상가 7,200,000원 (2인 기준)", 
        en: "Est. ₩7,200,000 (for 2 pax)" 
      }
    },
    schedule: [
      {
        day: 1,
        themeKo: "무의도 섬 입성 & 프라이빗 풀빌라 & 밤바다 불멍",
        themeEn: "Island & Campfire",
        items: [
          { time: "12:00 - 13:30", activityKo: "[이동/환영] 공항/송도 픽업 ➔ 무의대교 건너 무의도 풀빌라 체크인", activityEn: "[Welcome] Airport/Songdo pickup, crossing Muui Bridge to check-in at private pool villa" },
          { time: "13:30 - 15:00", activityKo: "[미식] 무의도 로컬 해산물 칼국수 & 물회 점심", activityEn: "[Dining] Muuido local seafood noodle soup & raw fish soup lunch" },
          { time: "15:00 - 17:30", activityKo: "[체험/레저] 무의도 하나개해수욕장 짚라인(Zip-line) & 사륜 ATV 바이크 체험", activityEn: "[Experience] Muuido Hanagae Beach zip-line & four-wheel ATV bike experience" },
          { time: "17:30 - 20:00", activityKo: "[미식/BBQ] 독채 풀빌라 야외 테라스 럭셔리 해산물/바비큐 프라이빗 파티", activityEn: "[Dining] Outdoor terrace luxury seafood & BBQ private party at pool villa" },
          { time: "20:00 - 22:00", activityKo: "[힐링] 밤바다 해안가 프라이빗 캠프파이어 (불멍), 뱅쇼/와인 다담", activityEn: "[Wellness] Oceanfront private campfire (staring into flames) with vin chaud/wine" }
        ]
      },
      {
        day: 2,
        themeKo: "갯벌 생태 탐방 & 어부 조업 다이닝",
        themeEn: "Mudflat & Catch of the Day",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 풀빌라 오션뷰 프라이빗 조식 갓 구운 빵과 커피", activityEn: "[Breakfast] Pool villa ocean-view private breakfast with freshly baked bread & coffee" },
          { time: "10:30 - 13:00", activityKo: "[교육/체험] 무의도 갯벌 생태 도슨트 탐방 (조개 캐기/게 잡기 1:1 자연 교육)", activityEn: "[Experience] Muuido mudflat ecological docent tour (clams harvesting/crabs catching 1:1 education)" },
          { time: "13:00 - 14:30", activityKo: "[미식] 로컬 어부/해녀가 당일 조업한 싱싱한 활어회 & 장어 구이 다이닝", activityEn: "[Dining] Fresh raw fish & grilled eel dining caught that day by local fishermen/Haenyeo" },
          { time: "14:30 - 17:30", activityKo: "[힐링/트레킹] 무의도 환상길(해안 데크길) 힐링 트레킹 & 오션뷰 카페 차담", activityEn: "[Wellness] Muuido Fantasy Road (coastal deck walk) healing trek & ocean-view café tea chat" },
          { time: "17:30 - 20:00", activityKo: "[미식] 섬 전통 선상 낚시 체험 또는 프라이빗 해산물 찜 다이닝", activityEn: "[Dining] Island traditional boat fishing experience or private seafood steam dining" },
          { time: "20:00 - 22:00", activityKo: "[힐링] 풀빌라 프라이빗 온수풀 수영 & 밤바다 파도 소리와 함께하는 야간 스파 힐링", activityEn: "[Wellness] Private heated pool swim & night spa healing with the soothing sound of ocean waves" }
        ]
      },
      {
        day: 3,
        themeKo: "소무의도 인도교 산책 & 작별",
        themeEn: "Bridge Walk & Farewell",
        items: [
          { time: "09:00 - 10:30", activityKo: "[조식] 섬 특산물 전복죽 조식 & 호스트 감사의 글 전달", activityEn: "[Breakfast] Island specialty abalone porridge breakfast & thank you letter from host" },
          { time: "10:30 - 12:30", activityKo: "[체험] 소무의도 인도교 걷기 & 떼무리 도보 해안길 산책", activityEn: "[Activity] Walking across Somuuido pedestrian bridge & trekking along Taemuri coastal path" },
          { time: "12:30 - 14:00", activityKo: "[미식] 인천 영종도 오션뷰 카페 브런치 점심", activityEn: "[Dining] Yeongjongdo ocean-view cafe brunch lunch" },
          { time: "14:00 - 15:30", activityKo: "[추억/작별] 3일간의 스냅 리뷰 및 공항 프라이빗 샌딩 (4K 시네마틱 영상은 1주일 내 전달)", activityEn: "[Farewell] Snap photo review & private airport send-off (4K cinematic video delivered within 1 week)" }
        ]
      }
    ]
  }
];
