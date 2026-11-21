import type { AppLocale } from "@/i18n/routing";

type AuthCopy = { title: string; lead: string; signIn: string; required: string; requiredBody: string; logout: string; signedInAs: string };
export const authCopy: Record<AppLocale, AuthCopy> = {
  ja: { title: "ログイン", lead: "ログインするアカウントを選択してください。", signIn: "ログイン", required: "ログインが必要です", requiredBody: "この機能は、ログインしてから利用できます。", logout: "ログアウト", signedInAs: "ログイン中" },
  en: { title: "Sign in", lead: "Choose an account to continue.", signIn: "Sign in", required: "Sign-in required", requiredBody: "Sign in to use this feature.", logout: "Sign out", signedInAs: "Signed in" },
  fr: { title: "Connexion", lead: "Choisissez un compte pour continuer.", signIn: "Se connecter", required: "Connexion requise", requiredBody: "Connectez-vous pour utiliser cette fonction.", logout: "Se déconnecter", signedInAs: "Connecté" },
  de: { title: "Anmelden", lead: "Wähle ein Konto aus, um fortzufahren.", signIn: "Anmelden", required: "Anmeldung erforderlich", requiredBody: "Melde dich an, um diese Funktion zu nutzen.", logout: "Abmelden", signedInAs: "Angemeldet" },
  zh: { title: "登录", lead: "请选择一个账号以继续。", signIn: "登录", required: "需要登录", requiredBody: "请先登录再使用此功能。", logout: "退出登录", signedInAs: "已登录" },
};
