export interface CourseMeaning {
  title: string;
  desc: string;
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
    }
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
    }
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
    }
  }
];
