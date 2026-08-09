"use client";

import { useLanguage } from "@/lib/LanguageContext";

const COMPANY = "JourneyMate";
const CONTACT_EMAIL = "baeyongkim@gmail.com";
const CONTACT_PHONE = "+82-10-9900-8210";
const EFFECTIVE_DATE = "2025년 1월 1일";
const EFFECTIVE_DATE_EN = "January 1, 2025";

export default function PrivacyPolicyPage() {
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
            {isKo ? "개인정보처리방침" : "Privacy Policy"}
          </h1>
          <p className="text-sm text-gray-500">
            {isKo ? `시행일: ${EFFECTIVE_DATE}` : `Effective Date: ${EFFECTIVE_DATE_EN}`}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-10 text-sm text-blue-800">
          {isKo
            ? `${COMPANY}(이하 "회사")는 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령을 준수하며, 고객의 개인정보 보호를 최우선으로 합니다. 본 방침은 회사가 어떤 정보를 수집하고 어떻게 이용하는지 투명하게 안내합니다.`
            : `${COMPANY} ("Company") complies with applicable privacy laws including Korea's Personal Information Protection Act (PIPA) and prioritizes the protection of your personal information. This policy transparently explains what information we collect and how we use it.`}
        </div>

        {isKo ? (
          <>
            <Section title="1. 개인정보 처리자 정보">
              <ul className="space-y-2">
                <Li><strong>상호:</strong> {COMPANY}</Li>
                <Li><strong>개인정보 보호 책임자:</strong> JourneyMate 운영팀</Li>
                <Li><strong>연락처:</strong> {CONTACT_EMAIL} / {CONTACT_PHONE}</Li>
                <Li><strong>서비스 지역:</strong> 대한민국 (인천광역시 및 수도권 중심)</Li>
              </ul>
            </Section>

            <Section title="2. 수집하는 개인정보 항목 및 수집 방법">
              <p>회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.</p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-jm-navy)] text-white">
                      <th className="p-3 text-left rounded-tl-lg">구분</th>
                      <th className="p-3 text-left">항목</th>
                      <th className="p-3 text-left rounded-tr-lg">수집 방법</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["필수", "이메일 주소, 소셜 로그인 식별자(Google 등)", "회원가입 시 자동 수집"],
                      ["선택", "여권상 영문 이름, 국적, 연락처(전화·WhatsApp), 주소", "마이페이지 프로필 입력"],
                      ["서비스 이용", "여행 일정, 선택 체험, 요청 사항", "여정 만들기 입력"],
                      ["자동 수집", "접속 IP, 브라우저 정보, 서비스 이용 기록", "웹사이트 접속 시 자동"],
                    ].map(([type, items, method], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 border-b border-gray-100 font-semibold text-[var(--color-jm-navy)]">{type}</td>
                        <td className="p-3 border-b border-gray-100">{items}</td>
                        <td className="p-3 border-b border-gray-100 text-gray-500 text-xs">{method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="3. 개인정보의 처리 목적">
              <ul className="space-y-2">
                <Li><strong>서비스 제공:</strong> 여행 예약 확인, 호스트 배정, 일정 조율 및 안내</Li>
                <Li><strong>회원 관리:</strong> 로그인 인증, 마이페이지 서비스, 불법 이용 방지</Li>
                <Li><strong>고객 지원:</strong> 문의 응대, 불만 처리, 분쟁 해결을 위한 기록 보존</Li>
                <Li><strong>서비스 개선:</strong> 이용 통계 분석, 서비스 품질 향상 (개인 식별 불가 형태로 처리)</Li>
                <Li><strong>마케팅(선택 동의 시):</strong> 신규 서비스 및 이벤트 안내 (언제든지 수신 거부 가능)</Li>
              </ul>
            </Section>

            <Section title="4. 개인정보의 보유 및 이용 기간">
              <p>수집된 개인정보는 다음의 기간 동안 보유합니다.</p>
              <ul className="space-y-2 mt-2">
                <Li><strong>회원 정보:</strong> 회원 탈퇴 시까지. 단, 관련 법령에 따른 보존 의무가 있는 경우 해당 기간</Li>
                <Li><strong>예약 및 거래 기록:</strong> 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 5년</Li>
                <Li><strong>소비자 불만 및 분쟁 처리 기록:</strong> 동법에 따라 3년</Li>
                <Li><strong>접속 로그:</strong> 「통신비밀보호법」에 따라 3개월</Li>
              </ul>
            </Section>

            <Section title="5. 개인정보의 제3자 제공">
              <p>회사는 원칙적으로 고객의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외입니다.</p>
              <ul className="space-y-2 mt-2">
                <Li>고객이 사전에 동의한 경우</Li>
                <Li>법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</Li>
                <Li>서비스 제공을 위해 필수적인 제3자(결제 대행사, 숙박 업체 등)에게 최소한의 정보를 제공하는 경우 (해당 제3자의 개인정보처리 정책에 따름)</Li>
              </ul>
            </Section>

            <Section title="6. 개인정보 처리의 위탁">
              <ul className="space-y-2">
                <Li><strong>Firebase(Google LLC):</strong> 회원 인증, 데이터베이스 저장 및 관리 (미국 소재, Google 개인정보처리방침 준용)</Li>
                <Li><strong>WhatsApp(Meta Platforms, Inc.):</strong> 고객 상담 채널 (미국 소재, Meta 개인정보처리방침 준용)</Li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">각 수탁사의 개인정보 처리 위탁 목적은 해당 서비스 운영을 위한 최소한의 범위에 한정됩니다.</p>
            </Section>

            <Section title="7. 이용자의 권리 및 행사 방법">
              <p>고객은 언제든지 다음의 권리를 행사할 수 있습니다.</p>
              <ul className="space-y-2 mt-2">
                <Li><strong>열람권:</strong> 보유 중인 개인정보의 확인을 요청할 수 있습니다.</Li>
                <Li><strong>정정·삭제권:</strong> 부정확한 개인정보의 수정 또는 삭제를 요청할 수 있습니다.</Li>
                <Li><strong>처리 정지권:</strong> 개인정보 처리의 일시적 중단을 요청할 수 있습니다.</Li>
                <Li><strong>이의 제기권:</strong> 개인정보 처리에 대해 이의를 제기할 수 있습니다.</Li>
              </ul>
              <p className="mt-3">권리 행사는 {CONTACT_EMAIL}로 서면, 이메일 등을 통해 요청하실 수 있으며, 회사는 지체 없이(10일 이내) 처리합니다.</p>
            </Section>

            <Section title="8. 쿠키(Cookie) 및 분석 도구 사용">
              <ul className="space-y-2">
                <Li>회사는 서비스 이용 편의 향상을 위해 쿠키를 사용할 수 있습니다. 쿠키는 브라우저 설정을 통해 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.</Li>
                <Li>서비스 개선을 위한 익명화된 이용 통계는 Google Analytics 등을 활용할 수 있습니다.</Li>
              </ul>
            </Section>

            <Section title="9. 개인정보의 안전성 확보 조치">
              <ul className="space-y-2">
                <Li>개인정보의 암호화 저장 및 전송(SSL/TLS)</Li>
                <Li>접근 권한의 최소화 및 접근 통제</Li>
                <Li>Firebase Security Rules를 통한 데이터베이스 접근 제어</Li>
                <Li>개인정보 취급 직원의 최소화 및 교육</Li>
              </ul>
            </Section>

            <Section title="10. 개인정보 보호 책임자 및 문의처">
              <ul className="space-y-2">
                <Li><strong>담당 부서:</strong> {COMPANY} 운영팀</Li>
                <Li><strong>이메일:</strong> {CONTACT_EMAIL}</Li>
                <Li><strong>전화:</strong> {CONTACT_PHONE}</Li>
              </ul>
              <p className="mt-3 text-sm text-gray-500">개인정보 침해에 관한 신고 및 상담은 한국인터넷진흥원 개인정보침해 신고센터(privacy.kisa.or.kr / 국번없이 118)에도 문의하실 수 있습니다.</p>
            </Section>

            <div className="text-center text-sm text-gray-400 border-t pt-8 mt-8">
              © {new Date().getFullYear()} {COMPANY}. 본 개인정보처리방침은 {EFFECTIVE_DATE}부터 시행됩니다.
            </div>
          </>
        ) : (
          <>
            <Section title="1. Data Controller Information">
              <ul className="space-y-2">
                <Li><strong>Company Name:</strong> {COMPANY}</Li>
                <Li><strong>Privacy Officer:</strong> {COMPANY} Operations Team</Li>
                <Li><strong>Contact:</strong> {CONTACT_EMAIL} / {CONTACT_PHONE}</Li>
                <Li><strong>Service Area:</strong> Republic of Korea (Incheon & Greater Seoul Area)</Li>
              </ul>
            </Section>

            <Section title="2. Personal Information Collected & Collection Methods">
              <p>We collect the following personal information to provide our services:</p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-jm-navy)] text-white">
                      <th className="p-3 text-left rounded-tl-lg">Category</th>
                      <th className="p-3 text-left">Items</th>
                      <th className="p-3 text-left rounded-tr-lg">Collection Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Required", "Email address, social login identifier (Google, etc.)", "Collected automatically at sign-up"],
                      ["Optional", "Passport name, nationality, phone/WhatsApp, address", "Entered via My Page profile"],
                      ["Service Usage", "Travel itinerary, selected experiences, special requests", "Entered via Create Journey"],
                      ["Auto-collected", "Access IP, browser info, service usage logs", "Automatically upon site access"],
                    ].map(([type, items, method], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 border-b border-gray-100 font-semibold text-[var(--color-jm-navy)]">{type}</td>
                        <td className="p-3 border-b border-gray-100">{items}</td>
                        <td className="p-3 border-b border-gray-100 text-gray-500 text-xs">{method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="3. Purposes of Processing Personal Information">
              <ul className="space-y-2">
                <Li><strong>Service Delivery:</strong> Booking confirmation, host assignment, itinerary coordination</Li>
                <Li><strong>Account Management:</strong> Login authentication, My Page services, fraud prevention</Li>
                <Li><strong>Customer Support:</strong> Inquiry handling, complaint resolution, dispute record-keeping</Li>
                <Li><strong>Service Improvement:</strong> Usage statistics analysis (in anonymized form)</Li>
                <Li><strong>Marketing (with consent):</strong> New service and event notifications (opt-out available at any time)</Li>
              </ul>
            </Section>

            <Section title="4. Retention Period of Personal Information">
              <ul className="space-y-2">
                <Li><strong>Member Information:</strong> Until account deletion, unless required by law</Li>
                <Li><strong>Booking & Transaction Records:</strong> 5 years (per Korea's E-Commerce Consumer Protection Act)</Li>
                <Li><strong>Consumer Complaints & Dispute Records:</strong> 3 years (per the same act)</Li>
                <Li><strong>Access Logs:</strong> 3 months (per Korea's Communications Secrets Protection Act)</Li>
              </ul>
            </Section>

            <Section title="5. Sharing Personal Information with Third Parties">
              <p>We do not share your personal information with third parties, except in the following cases:</p>
              <ul className="space-y-2 mt-2">
                <Li>When the Customer has given prior consent</Li>
                <Li>When required by law or requested by authorities through lawful procedures</Li>
                <Li>When minimum necessary information is shared with essential third parties (payment processors, accommodation providers) for service delivery</Li>
              </ul>
            </Section>

            <Section title="6. Data Processing Sub-contractors">
              <ul className="space-y-2">
                <Li><strong>Firebase (Google LLC):</strong> User authentication, database storage and management (USA-based, subject to Google's Privacy Policy)</Li>
                <Li><strong>WhatsApp (Meta Platforms, Inc.):</strong> Customer consultation channel (USA-based, subject to Meta's Privacy Policy)</Li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">Sub-contractors are permitted to use personal data only to the minimum extent necessary for the delegated service operations.</p>
            </Section>

            <Section title="7. Your Rights & How to Exercise Them">
              <p>You may exercise the following rights at any time:</p>
              <ul className="space-y-2 mt-2">
                <Li><strong>Right of Access:</strong> Request to view personal information we hold about you</Li>
                <Li><strong>Right to Rectification/Erasure:</strong> Request correction or deletion of inaccurate information</Li>
                <Li><strong>Right to Restriction:</strong> Request temporary suspension of personal information processing</Li>
                <Li><strong>Right to Object:</strong> Object to the processing of your personal information</Li>
              </ul>
              <p className="mt-3">Requests may be submitted via email to {CONTACT_EMAIL}. We will respond within 10 days.</p>
            </Section>

            <Section title="8. Cookies & Analytics">
              <ul className="space-y-2">
                <Li>We may use cookies to enhance your browsing experience. Cookies can be disabled in your browser settings, though some service features may be limited as a result.</Li>
                <Li>Anonymized usage statistics may be collected via tools such as Google Analytics to help improve our services.</Li>
              </ul>
            </Section>

            <Section title="9. Security Measures">
              <ul className="space-y-2">
                <Li>Encrypted storage and transmission of personal data (SSL/TLS)</Li>
                <Li>Minimized access rights and strict access control</Li>
                <Li>Database access control via Firebase Security Rules</Li>
                <Li>Staff training and minimization of personnel with access to personal data</Li>
              </ul>
            </Section>

            <Section title="10. Contact & Data Protection Authority">
              <ul className="space-y-2">
                <Li><strong>Department:</strong> {COMPANY} Operations Team</Li>
                <Li><strong>Email:</strong> {CONTACT_EMAIL}</Li>
                <Li><strong>Phone:</strong> {CONTACT_PHONE}</Li>
              </ul>
              <p className="mt-3 text-sm text-gray-500">For privacy-related complaints, you may also contact Korea Internet & Security Agency (KISA) at privacy.kisa.or.kr or call 118 (Korea only).</p>
            </Section>

            <div className="text-center text-sm text-gray-400 border-t pt-8 mt-8">
              © {new Date().getFullYear()} {COMPANY}. This Privacy Policy is effective as of {EFFECTIVE_DATE_EN}.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
