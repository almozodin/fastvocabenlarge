export type WordCard = {
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  etymology: string;
  aiNote: string;
};

export const wordCards: WordCard[] = [
  {
    word: "origin",
    phonetic: "/ˈɔːrɪdʒɪn/",
    meaning: "起源；来源",
    example: "The origin of the word is Latin.",
    etymology: "预留给词源内容。",
    aiNote: "预留给后续 AI API 生成的解释、联想和例句。",
  },
  {
    word: "expand",
    phonetic: "/ɪkˈspænd/",
    meaning: "扩大；扩展",
    example: "The app will expand with AI-generated notes later.",
    etymology: "预留给词根、前缀和拉丁来源。",
    aiNote: "这里以后可以展示 AI 生成的记忆钩子。",
  },
  {
    word: "lucid",
    phonetic: "/ˈluːsɪd/",
    meaning: "清楚的；易懂的",
    example: "A lucid card helps learners remember faster.",
    etymology: "预留给词源和同族词。",
    aiNote: "这里以后可以解释与 light、illuminate 等词的联系。",
  },
];
