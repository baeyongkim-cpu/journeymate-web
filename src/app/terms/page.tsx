"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function TermsOfServicePage() {
  const { t, lang } = useLanguage();
  const isKo = lang === "ko";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">
        {t("이용약관", "Terms of Service")}
      </h1>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        {isKo ? (
          <>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">제 1 조 (목적)</h2>
              <p>이 약관은 JourneyMate(이하 "회사")가 제공하는 여행, 스냅 촬영 및 동행 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">제 2 조 (서비스의 성격 및 책임의 한계)</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>회사가 제공하는 서비스는 '사진 및 영상 스냅 촬영'을 주 목적으로 하며, 현지 동반자로서의 역할에 한정됩니다.</li>
                <li><strong>본 서비스는 전문 가이드(관광통역안내사 등)의 투어 서비스가 아님을 명확히 합니다.</strong> 따라서 역사적 사실에 대한 전문적인 해설이나 전통적인 여행 가이드 역할은 포함되지 않습니다.</li>
                <li>촬영을 위한 장소 이동 및 일정 진행 중 발생할 수 있는 개인의 부주의로 인한 사고나 소지품 분실에 대해서는 회사가 책임을 지지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">제 3 조 (결제 및 환불)</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>예약 시 총 금액의 20%를 보증금(Deposit)으로 선결제해야 예약이 확정됩니다.</li>
                <li>잔금 및 별도 결제 항목(숙박, 픽업, 렌탈 등)은 서비스 시작 전 또는 현장에서 결제할 수 있습니다.</li>
                <li>서비스 이용일 7일 전까지 취소 시 보증금은 전액 환불되며, 그 이후 취소 시에는 회사 정책에 따른 위약금이 발생할 수 있습니다.</li>
              </ul>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Article 1 (Purpose)</h2>
              <p>The purpose of these Terms of Service is to stipulate the rights, obligations, responsibilities, and other necessary matters between JourneyMate ("Company") and the member in connection with the use of travel, snapshot photography, and companion services ("Services") provided by the Company.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Article 2 (Nature of Service and Limitation of Liability)</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>The service provided by the Company is primarily for 'photo and video snapshot shooting' and is limited to the role of a local companion.</li>
                <li><strong>It is clarified that this service is not a tour service provided by a professional guide (such as a certified tourist guide).</strong> Therefore, professional commentary on historical facts or traditional tour guide roles are not included.</li>
                <li>The Company is not responsible for any accidents or loss of belongings caused by personal negligence during the movement of locations and schedule for the shoot.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Article 3 (Payment and Refund)</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>When booking, a 20% deposit of the total amount must be paid in advance to confirm the reservation.</li>
                <li>The balance and separately paid items (accommodation, pickup, rental, etc.) can be paid before the service starts or on-site.</li>
                <li>If canceled up to 7 days before the date of service, the deposit is fully refunded. If canceled after that, a penalty may apply according to the Company's policy.</li>
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
