import { NextRequest, NextResponse } from "next/server";

const translations: Record<string, Record<string, string>> = {
  en: {
    "ペンギンの夜空 壁紙セット": "Penguin Night Sky Wallpaper Set", "デスクトップとスマートフォン向けの高解像度壁紙12枚セットです。": "A set of 12 high-resolution wallpapers for desktop and mobile.",
    "シンプル家計簿テンプレート": "Simple Budget Planner Template", "毎日の支出を迷わず記録できる、使いやすい家計簿テンプレートです。": "An easy budget template for tracking daily expenses.",
    "作業用チルBGMパック": "Chill Work BGM Pack", "動画や配信にも使える、ループ対応の落ち着いたBGMを収録しています。": "A collection of calm, loop-ready tracks for videos and streams.",
    "画像リサイズミニツール": "Image Resize Mini Tool", "複数画像のサイズをまとめて整えるための小さなデスクトップツールです。": "A small desktop tool for resizing multiple images at once.",
    "海のいきもの アイコン集": "Sea Creature Icon Collection", "SNSや資料で使える、やさしい色合いのアイコン40点です。": "40 softly colored icons for social posts and documents.",
    "企画書スライドキット": "Proposal Slide Kit", "企画の流れを整理しやすいプレゼンテーション用テンプレートです。": "A presentation template that makes proposals easy to structure.",
    "ゲーム向け効果音20選": "20 Game Sound Effects", "決定、キャンセル、通知など、UIに使いやすい短い効果音セットです。": "A set of short UI sounds for confirm, cancel, notifications, and more.",
    "集中タイマー": "Focus Timer", "集中時間と休憩時間をシンプルに管理できるタイマーです。": "A simple timer for managing focus sessions and breaks.",
    "モック用ウェルカムポイント": "Mock welcome points", "モック決済によるポイント追加": "Points added by mock payment",
  },
  fr: {
    "ペンギンの夜空 壁紙セット": "Fonds d’écran Pingouin sous les étoiles", "デスクトップとスマートフォン向けの高解像度壁紙12枚セットです。": "Un lot de 12 fonds d’écran haute résolution pour ordinateur et mobile.",
    "シンプル家計簿テンプレート": "Modèle de budget simple", "毎日の支出を迷わず記録できる、使いやすい家計簿テンプレートです。": "Un modèle simple pour suivre facilement les dépenses quotidiennes.",
    "作業用チルBGMパック": "Pack de musique chill", "動画や配信にも使える、ループ対応の落ち着いたBGMを収録しています。": "Des morceaux calmes en boucle pour vidéos et diffusions.",
    "画像リサイズミニツール": "Mini-outil de redimensionnement", "複数画像のサイズをまとめて整えるための小さなデスクトップツールです。": "Un petit outil pour redimensionner plusieurs images à la fois.",
    "海のいきもの アイコン集": "Icônes d’animaux marins", "SNSや資料で使える、やさしい色合いのアイコン40点です。": "40 icônes aux couleurs douces pour réseaux sociaux et documents.",
    "企画書スライドキット": "Kit de diapositives de projet", "企画の流れを整理しやすいプレゼンテーション用テンプレートです。": "Un modèle de présentation pour structurer facilement vos projets.",
    "ゲーム向け効果音20選": "20 effets sonores pour jeux", "決定、キャンセル、通知など、UIに使いやすい短い効果音セットです。": "Des sons courts pour confirmer, annuler et notifier.",
    "集中タイマー": "Minuteur de concentration", "集中時間と休憩時間をシンプルに管理できるタイマーです。": "Un minuteur simple pour alterner concentration et pauses.",
    "モック用ウェルカムポイント": "Points de bienvenue de la démo", "モック決済によるポイント追加": "Points ajoutés par paiement simulé",
  },
  de: {
    "ペンギンの夜空 壁紙セット": "Pinguin-Nachthimmel-Hintergründe", "デスクトップとスマートフォン向けの高解像度壁紙12枚セットです。": "12 hochauflösende Hintergründe für Desktop und Smartphone.",
    "シンプル家計簿テンプレート": "Einfache Haushaltsbuch-Vorlage", "毎日の支出を迷わず記録できる、使いやすい家計簿テンプレートです。": "Eine einfache Vorlage zum Erfassen täglicher Ausgaben.",
    "作業用チルBGMパック": "Chill-Musikpaket zum Arbeiten", "動画や配信にも使える、ループ対応の落ち着いたBGMを収録しています。": "Ruhige, loopfähige Musik für Videos und Streams.",
    "画像リサイズミニツール": "Mini-Tool zum Skalieren von Bildern", "複数画像のサイズをまとめて整えるための小さなデスクトップツールです。": "Ein kleines Desktop-Tool zum gleichzeitigen Skalieren mehrerer Bilder.",
    "海のいきもの アイコン集": "Meerestiere-Iconset", "SNSや資料で使える、やさしい色合いのアイコン40点です。": "40 sanft gefärbte Icons für Social Media und Dokumente.",
    "企画書スライドキット": "Präsentationsfolien-Kit", "企画の流れを整理しやすいプレゼンテーション用テンプレートです。": "Eine Vorlage für übersichtlich strukturierte Präsentationen.",
    "ゲーム向け効果音20選": "20 Soundeffekte für Spiele", "決定、キャンセル、通知など、UIに使いやすい短い効果音セットです。": "Kurze UI-Sounds für Bestätigen, Abbrechen und Benachrichtigungen.",
    "集中タイマー": "Fokus-Timer", "集中時間と休憩時間をシンプルに管理できるタイマーです。": "Ein einfacher Timer für Fokusphasen und Pausen.",
    "モック用ウェルカムポイント": "Demo-Willkommenspunkte", "モック決済によるポイント追加": "Punkte durch Demo-Zahlung hinzugefügt",
  },
  "zh-CN": {
    "ペンギンの夜空 壁紙セット": "企鹅星空壁纸套装", "デスクトップとスマートフォン向けの高解像度壁紙12枚セットです。": "包含12张适用于电脑和手机的高分辨率壁纸。",
    "シンプル家計簿テンプレート": "简洁记账模板", "毎日の支出を迷わず記録できる、使いやすい家計簿テンプレートです。": "轻松记录每日支出的实用记账模板。",
    "作業用チルBGMパック": "工作用轻松背景音乐包", "動画や配信にも使える、ループ対応の落ち着いたBGMを収録しています。": "适合视频和直播使用的舒缓循环背景音乐。",
    "画像リサイズミニツール": "图片批量缩放小工具", "複数画像のサイズをまとめて整えるための小さなデスクトップツールです。": "可一次调整多张图片尺寸的桌面小工具。",
    "海のいきもの アイコン集": "海洋生物图标集", "SNSや資料で使える、やさしい色合いのアイコン40点です。": "40个适用于社交媒体和文档的柔和配色图标。",
    "企画書スライドキット": "提案幻灯片套件", "企画の流れを整理しやすいプレゼンテーション用テンプレートです。": "便于梳理提案结构的演示文稿模板。",
    "ゲーム向け効果音20選": "20款游戏音效", "決定、キャンセル、通知など、UIに使いやすい短い効果音セットです。": "包含确认、取消和通知等实用的短UI音效。",
    "集中タイマー": "专注计时器", "集中時間と休憩時間をシンプルに管理できるタイマーです。": "简单管理专注时间和休息时间的计时器。",
    "モック用ウェルカムポイント": "模拟欢迎积分", "モック決済によるポイント追加": "通过模拟支付添加积分",
  },
};

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text")?.trim();
  const target = request.nextUrl.searchParams.get("target") ?? "";
  if (!text || !translations[target]) return NextResponse.json({ message: "Invalid translation request" }, { status: 400 });
  return NextResponse.json({ translatedText: translations[target][text] ?? text, cached: true });
}
