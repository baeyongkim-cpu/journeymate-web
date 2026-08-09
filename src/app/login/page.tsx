"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          {isSignUp ? t("회원가입", "Sign Up") : t("로그인", "Login")}
        </h1>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-50 transition-colors mb-6 font-medium"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          {t("Google로 계속하기", "Continue with Google")}
        </button>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
            {t("또는 이메일로", "Or with email")}
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("이메일", "Email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("비밀번호", "Password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg p-3 font-bold hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? t("가입하기", "Sign Up") : t("로그인", "Login")}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {isSignUp ? t("이미 계정이 있으신가요?", "Already have an account?") : t("계정이 없으신가요?", "Don't have an account?")}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isSignUp ? t("로그인", "Login") : t("회원가입", "Sign Up")}
          </button>
        </p>
      </div>
    </div>
  );
}
