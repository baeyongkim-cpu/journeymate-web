"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t, lang } = useLanguage();
  const isKo = lang === "ko";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">
        {t("개인정보처리방침", "Privacy Policy")}
      </h1>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        {isKo ? (
          <>
            <p><strong>시행일:</strong> {new Date().getFullYear()}년</p>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. 개인정보의 처리 목적</h2>
              <p>JourneyMate(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 사전 동의를 구합니다.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>서비스 제공 및 계약의 이행 (여행 상품 예약, 스냅 촬영 일정 조율 등)</li>
                <li>회원 가입 및 관리 (본인 식별, 불량 회원의 부정 이용 방지 등)</li>
                <li>고충 처리 및 분쟁 해결을 위한 기록 보존</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. 수집하는 개인정보 항목</h2>
              <p>회사는 서비스 제공을 위해 다음의 개인정보를 수집하고 있습니다.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>필수항목: 이름, 이메일 주소, 로그인 식별자(구글/카카오 등 SNS 로그인 시 제공되는 식별 정보)</li>
                <li>선택항목: 휴대전화 번호, 카카오톡 ID 등 연락처 (예약 및 동행 안내 목적)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
              <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
            </section>
          </>
        ) : (
          <>
            <p><strong>Effective Date:</strong> {new Date().getFullYear()}</p>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Purpose of Processing Personal Information</h2>
              <p>JourneyMate ("Company") processes personal information for the following purposes. The processed personal information will not be used for purposes other than the following, and prior consent will be sought if the purpose of use changes.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provision of services and fulfillment of contracts (booking tour products, arranging snapshot schedules, etc.)</li>
                <li>Membership registration and management (identification, prevention of fraudulent use, etc.)</li>
                <li>Preservation of records for handling complaints and dispute resolution</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Items of Personal Information Collected</h2>
              <p>The Company collects the following personal information to provide services.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Required items: Name, email address, login identifier (identification information provided upon SNS login such as Google)</li>
                <li>Optional items: Mobile phone number, messenger ID (for booking and companion guidance purposes)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Retention and Use Period of Personal Information</h2>
              <p>The Company processes and retains personal information within the retention and use period agreed upon when collecting personal information from the data subject or the retention and use period according to laws and regulations. In principle, after the purpose of collecting and using personal information has been achieved, the information is destroyed without delay.</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
