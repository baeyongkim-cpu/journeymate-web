"use client";

import { useLanguage } from "@/lib/LanguageContext";

const COMPANY = "JourneyMate";
const CONTACT_EMAIL = "baeyongkim@gmail.com";
const CONTACT_PHONE = "+82-10-9900-8210";
const EFFECTIVE_DATE = "2025년 1월 1일";
const EFFECTIVE_DATE_EN = "January 1, 2025";

export default function TermsOfServicePage() {
  const { lang } = useLanguage();
  const isKo = lang === "ko";

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-[var(--color-jm-navy)] border-l-4 border-[var(--color-jm-gold)] pl-4 mb-4">{title}</h2>
      <div className="text-gray-700 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );

  const Li = ({ children }: { children: React.ReactNode }) => (
    <li className="flex gap-2"><span className="text-[var(--color-jm-gold)] mt-1 shrink-0">▸</span><span>{children}</span></li>
  );

  return (
    <div className="min-h-screen bg-[var(--color-jm-cream)] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold text-[var(--color-jm-gold)] tracking-widest uppercase mb-3">
            {isKo ? "법적 고지" : "Legal Notice"}
          </p>
          <h1 className="text-4xl font-bold text-[var(--color-jm-navy)] mb-3">
            {isKo ? "이용약관" : "Terms of Service"}
          </h1>
          <p className="text-sm text-gray-500">
            {isKo ? `시행일: ${EFFECTIVE_DATE}` : `Effective Date: ${EFFECTIVE_DATE_EN}`}
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 text-sm text-amber-800">
          {isKo
            ? `본 약관은 ${COMPANY}(이하 "회사")가 제공하는 프라이빗 여행 동행, 스냅 촬영, 체험 및 관련 서비스 이용에 관한 전반적인 사항을 규정합니다. 서비스 이용 전 반드시 전문을 읽어주시기 바랍니다.`
            : `These Terms govern your use of ${COMPANY}'s private travel companion, snap photography, experience, and related services. Please read this document in full before using our services.`}
        </div>

        {isKo ? (
          <>
            <Section title="제 1 조 (목적)">
              <p>이 약관은 {COMPANY}(이하 "회사")가 제공하는 프라이빗 여행 동행·스냅 촬영·체험 및 VIP 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자(이하 "고객") 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
            </Section>

            <Section title="제 2 조 (서비스의 정의 및 범위)">
              <p>회사가 제공하는 서비스의 범위는 다음과 같습니다.</p>
              <ul className="space-y-2 mt-2">
                <Li>전담 호스트의 1:1 프라이빗 여행 동행 서비스</Li>
                <Li>스냅 사진 및 4K 시네마틱 영상 촬영 서비스</Li>
                <Li>인천 및 한국 내 프라이빗 체험(미식, 문화, 자연, 시티 투어 등)</Li>
                <Li>공항 픽업·샌딩, 전용 차량 제공, 숙소 예약 대행 등 VIP 부가 서비스</Li>
                <Li>WhatsApp 기반 1:1 여행 상담 및 일정 커스터마이징</Li>
              </ul>
              <p className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-3 text-sm">
                <strong>⚠️ 서비스 한계 고지:</strong> 본 서비스는 관광진흥법상 국내여행안내사·관광통역안내사 자격증에 의한 공인 가이드 서비스가 아닙니다. 전문 역사 해설, 국가 공인 통역 서비스는 제공되지 않습니다.
              </p>
            </Section>

            <Section title="제 3 조 (예약 및 계약 성립)">
              <ul className="space-y-2">
                <Li>예약은 웹사이트 내 여정 만들기 또는 WhatsApp 상담을 통해 신청할 수 있습니다.</Li>
                <Li>고객이 예약을 신청하고 회사가 이를 확인하는 시점에 서비스 계약이 성립합니다.</Li>
                <Li>미성년자(만 18세 미만)의 예약은 법정 대리인의 동의가 필요합니다.</Li>
                <Li>예약 확정 시 회사는 예약 확인서를 이메일 또는 WhatsApp으로 발송합니다.</Li>
              </ul>
            </Section>

            <Section title="제 4 조 (요금 및 결제)">
              <ul className="space-y-2">
                <Li>서비스 요금은 예약 시 안내된 금액을 기준으로 합니다.</Li>
                <Li>예약 확정을 위해 총 금액의 <strong>30%를 보증금(Deposit)</strong>으로 선결제해야 합니다.</Li>
                <Li>잔금은 서비스 시작일 <strong>7일 전까지</strong> 납부하는 것을 원칙으로 하며, 현지 결제 방식은 별도 협의합니다.</Li>
                <Li>숙박, 식음료, 입장료 등 외부 비용은 별도 청구될 수 있으며, 예약 전 안내합니다.</Li>
                <Li>결제 통화는 원화(KRW) 또는 미국 달러(USD)로 처리되며, 환율 변동에 따른 차이는 고객이 부담합니다.</Li>
              </ul>
            </Section>

            <Section title="제 5 조 (취소 및 환불 정책)">
              <p>소비자분쟁해결기준(공정거래위원회 고시) 및 관광진흥법을 준용한 환불 정책은 다음과 같습니다.</p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-jm-navy)] text-white">
                      <th className="p-3 text-left rounded-tl-lg">취소 시점</th>
                      <th className="p-3 text-left rounded-tr-lg">환불 금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["서비스일 15일 이전", "보증금 포함 전액 환불"],
                      ["서비스일 8~14일 전", "총 금액의 90% 환불"],
                      ["서비스일 4~7일 전", "총 금액의 70% 환불"],
                      ["서비스일 1~3일 전", "총 금액의 50% 환불"],
                      ["서비스일 당일 또는 No-Show", "환불 불가"],
                    ].map(([when, amount], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 border-b border-gray-100">{when}</td>
                        <td className="p-3 border-b border-gray-100 font-medium">{amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3 text-gray-500">* 천재지변, 전염병, 정부 명령 등 불가항력적 사유로 인한 취소는 별도 협의합니다.</p>
            </Section>

            <Section title="제 6 조 (회사의 의무)">
              <ul className="space-y-2">
                <Li>회사는 예약 확정된 서비스를 성실히 제공할 의무를 집니다.</Li>
                <Li>서비스 제공 불가 시 대안 일정을 제시하거나 전액 환불합니다.</Li>
                <Li>고객의 개인정보를 관련 법령에 따라 안전하게 보호합니다.</Li>
                <Li>서비스 품질 개선을 위해 지속적으로 노력합니다.</Li>
              </ul>
            </Section>

            <Section title="제 7 조 (고객의 의무)">
              <ul className="space-y-2">
                <Li>고객은 정확한 개인정보(여권상 영문명 등)를 제공해야 합니다.</Li>
                <Li>서비스 이용 중 타인에게 피해를 주거나 법령·공중도덕에 반하는 행위를 하여서는 안 됩니다.</Li>
                <Li>일정 변경이 필요한 경우 서비스일 48시간 전까지 회사에 통보해야 합니다.</Li>
                <Li>촬영 결과물(사진·영상)에 대한 상업적 사용은 별도의 서면 동의가 필요합니다.</Li>
              </ul>
            </Section>

            <Section title="제 8 조 (책임의 한계)">
              <ul className="space-y-2">
                <Li>회사는 고객의 귀책사유로 인한 손해, 천재지변 등 불가항력적 사유로 인한 손해에 대해서는 책임을 지지 않습니다.</Li>
                <Li>촬영 중 개인의 부주의로 인한 상해, 소지품 분실·파손은 회사의 책임 범위에 포함되지 않습니다.</Li>
                <Li>제3자(숙소, 교통기관 등)의 귀책사유로 인한 손해에 대해 회사는 해결을 위한 노력을 다하되, 직접적 손해 배상 책임은 부담하지 않습니다.</Li>
              </ul>
            </Section>

            <Section title="제 9 조 (지식재산권)">
              <ul className="space-y-2">
                <Li>서비스 제공 과정에서 생산된 사진 및 영상의 저작권은 촬영자(호스트)와 고객이 공동으로 보유합니다.</Li>
                <Li>회사는 고객의 사전 동의 없이 마케팅 목적으로 고객의 사진·영상을 사용하지 않습니다.</Li>
                <Li>고객이 SNS 등에 게시물을 업로드할 경우 {COMPANY} 태그를 허용합니다.</Li>
              </ul>
            </Section>

            <Section title="제 10 조 (분쟁 해결 및 준거법)">
              <ul className="space-y-2">
                <Li>본 약관은 대한민국 법령에 따라 해석·적용됩니다.</Li>
                <Li>서비스 이용과 관련한 분쟁은 우선 당사자 간 협의로 해결하며, 협의가 불가한 경우 한국소비자원 또는 관할 법원에서 해결합니다.</Li>
                <Li>문의 및 불만 접수: {CONTACT_EMAIL} / {CONTACT_PHONE}</Li>
              </ul>
            </Section>

            <div className="text-center text-sm text-gray-400 border-t pt-8 mt-8">
              © {new Date().getFullYear()} {COMPANY}. 본 약관은 {EFFECTIVE_DATE}부터 시행됩니다.
            </div>
          </>
        ) : (
          <>
            <Section title="Article 1 (Purpose)">
              <p>These Terms of Service ("Terms") govern the rights, obligations, responsibilities, and other necessary matters between {COMPANY} ("Company") and its users ("Customers") in connection with the use of private travel companion, snap photography, experience, and VIP services ("Services").</p>
            </Section>

            <Section title="Article 2 (Definition and Scope of Services)">
              <p>The scope of services provided by the Company includes:</p>
              <ul className="space-y-2 mt-2">
                <Li>1:1 Private travel companion service with a dedicated host</Li>
                <Li>Snap photography and 4K cinematic video production</Li>
                <Li>Private experiences in Incheon & Korea (food, culture, nature, city tours, etc.)</Li>
                <Li>VIP add-on services: airport pickup/drop-off, dedicated vehicles, accommodation booking assistance</Li>
                <Li>WhatsApp-based 1:1 travel consultation and itinerary customization</Li>
              </ul>
              <p className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-3 text-sm">
                <strong>⚠️ Service Limitation Notice:</strong> This service is not a licensed guide service under Korea's Tourism Promotion Act. Professional historical commentary and certified interpretation services are not included.
              </p>
            </Section>

            <Section title="Article 3 (Reservation & Contract Formation)">
              <ul className="space-y-2">
                <Li>Reservations may be made via the "Create Journey" feature on our website or through WhatsApp consultation.</Li>
                <Li>A service contract is formed when the Customer submits a reservation and the Company confirms it.</Li>
                <Li>Reservations by minors (under 18) require consent from a legal guardian.</Li>
                <Li>Upon confirmation, the Company will send a booking confirmation via email or WhatsApp.</Li>
              </ul>
            </Section>

            <Section title="Article 4 (Fees & Payment)">
              <ul className="space-y-2">
                <Li>Service fees are based on the amount quoted at the time of reservation.</Li>
                <Li>A <strong>30% deposit</strong> of the total amount is required to confirm the reservation.</Li>
                <Li>The remaining balance must be paid <strong>at least 7 days</strong> before the service date. On-site payment may be arranged separately.</Li>
                <Li>External costs (accommodation, food, admission fees, etc.) may be billed separately and will be disclosed before booking.</Li>
                <Li>Payment is processed in KRW or USD. Exchange rate fluctuations are the Customer's responsibility.</Li>
              </ul>
            </Section>

            <Section title="Article 5 (Cancellation & Refund Policy)">
              <p>Refund policy based on Korea's Consumer Dispute Resolution Standards:</p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-jm-navy)] text-white">
                      <th className="p-3 text-left rounded-tl-lg">Cancellation Timing</th>
                      <th className="p-3 text-left rounded-tr-lg">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["15+ days before service date", "Full refund including deposit"],
                      ["8–14 days before service date", "90% of total amount refunded"],
                      ["4–7 days before service date", "70% of total amount refunded"],
                      ["1–3 days before service date", "50% of total amount refunded"],
                      ["Day of service or No-Show", "No refund"],
                    ].map(([when, amount], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 border-b border-gray-100">{when}</td>
                        <td className="p-3 border-b border-gray-100 font-medium">{amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3 text-gray-500">* Cancellations due to force majeure (natural disasters, government orders, etc.) will be handled on a case-by-case basis.</p>
            </Section>

            <Section title="Article 6 (Company Obligations)">
              <ul className="space-y-2">
                <Li>The Company is obligated to faithfully deliver confirmed services.</Li>
                <Li>If service cannot be provided, the Company will propose an alternative schedule or issue a full refund.</Li>
                <Li>Customer personal information will be protected in accordance with applicable laws.</Li>
                <Li>The Company will continuously strive to improve service quality.</Li>
              </ul>
            </Section>

            <Section title="Article 7 (Customer Obligations)">
              <ul className="space-y-2">
                <Li>Customers must provide accurate personal information (e.g., passport name).</Li>
                <Li>Customers must not engage in conduct that harms others or violates laws or public morals.</Li>
                <Li>Schedule changes must be communicated to the Company at least 48 hours before the service date.</Li>
                <Li>Commercial use of photographs/videos produced during the service requires separate written consent.</Li>
              </ul>
            </Section>

            <Section title="Article 8 (Limitation of Liability)">
              <ul className="space-y-2">
                <Li>The Company is not liable for damages caused by the Customer's own negligence or force majeure events.</Li>
                <Li>Personal injuries or loss/damage of belongings due to personal carelessness during the service are not the Company's responsibility.</Li>
                <Li>For damages caused by third parties (accommodation, transportation, etc.), the Company will endeavor to resolve the issue but bears no direct liability.</Li>
              </ul>
            </Section>

            <Section title="Article 9 (Intellectual Property)">
              <ul className="space-y-2">
                <Li>Copyright of photos and videos produced during the service is jointly held by the photographer (host) and the Customer.</Li>
                <Li>The Company will not use Customer photos/videos for marketing without prior written consent.</Li>
                <Li>Customers are welcome to tag {COMPANY} when uploading content to social media.</Li>
              </ul>
            </Section>

            <Section title="Article 10 (Dispute Resolution & Governing Law)">
              <ul className="space-y-2">
                <Li>These Terms are governed by and construed in accordance with the laws of the Republic of Korea.</Li>
                <Li>Disputes will first be resolved through negotiation between the parties. If unresolved, they may be submitted to the Korea Consumer Agency or a court of competent jurisdiction.</Li>
                <Li>Inquiries & Complaints: {CONTACT_EMAIL} / {CONTACT_PHONE}</Li>
              </ul>
            </Section>

            <div className="text-center text-sm text-gray-400 border-t pt-8 mt-8">
              © {new Date().getFullYear()} {COMPANY}. These Terms are effective as of {EFFECTIVE_DATE_EN}.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
