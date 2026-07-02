import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const book = await prisma.wordBook.upsert({
    where: { slug: "starter" },
    update: {},
    create: {
      title: "Starter",
      slug: "starter",
      description: "Empty starter book for platform verification.",
    },
  });

  const words = [
    {
      term: "origin",
      phonetic: "/ˈɔːrɪdʒɪn/",
      meaning: "起源；来源",
      example: "The origin of the word is Latin.",
      etymologySummary: "预留给词源内容。",
      aiNote: "预留给后续 AI API 生成的解释、联想和例句。",
    },
    {
      term: "expand",
      phonetic: "/ɪkˈspænd/",
      meaning: "扩大；扩展",
      example: "The app will expand with AI-generated notes later.",
      etymologySummary: "预留给词根、前缀和拉丁来源。",
      aiNote: "这里以后可以展示 AI 生成的记忆钩子。",
    },
    {
      term: "lucid",
      phonetic: "/ˈluːsɪd/",
      meaning: "清楚的；易懂的",
      example: "A lucid card helps learners remember faster.",
      etymologySummary: "预留给词源和同族词。",
      aiNote: "这里以后可以解释与 light、illuminate 等词的联系。",
    },
  ];

  for (const [position, wordSeed] of words.entries()) {
    const word = await prisma.word.upsert({
      where: { term_language: { term: wordSeed.term, language: "en" } },
      update: {
        phonetic: wordSeed.phonetic,
      },
      create: {
        term: wordSeed.term,
        phonetic: wordSeed.phonetic,
      },
    });

    await prisma.wordCard.upsert({
      where: { id: `${word.id}-starter-card` },
      update: {
        meaning: wordSeed.meaning,
        example: wordSeed.example,
        etymologySummary: wordSeed.etymologySummary,
        aiNote: wordSeed.aiNote,
      },
      create: {
        id: `${word.id}-starter-card`,
        wordId: word.id,
        meaning: wordSeed.meaning,
        example: wordSeed.example,
        etymologySummary: wordSeed.etymologySummary,
        aiNote: wordSeed.aiNote,
      },
    });

    await prisma.wordBookItem.upsert({
      where: { bookId_wordId: { bookId: book.id, wordId: word.id } },
      update: { position },
      create: {
        bookId: book.id,
        wordId: word.id,
        position,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
