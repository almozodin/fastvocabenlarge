const words = [
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

let activeIndex = 0;

const elements = {
  queueList: document.querySelector("#queue-list"),
  queueCount: document.querySelector("#queue-count"),
  cardIndex: document.querySelector("#card-index"),
  word: document.querySelector("#word"),
  phonetic: document.querySelector("#phonetic"),
  meaning: document.querySelector("#meaning"),
  example: document.querySelector("#example"),
  etymology: document.querySelector("#etymology"),
  aiNote: document.querySelector("#ai-note"),
};

function renderQueue() {
  elements.queueList.innerHTML = "";
  elements.queueCount.textContent = String(words.length);

  words.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `queue-item${index === activeIndex ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${item.word}</strong><span>${item.meaning}</span>`;
    button.addEventListener("click", () => {
      activeIndex = index;
      render();
    });
    elements.queueList.append(button);
  });
}

function renderCard() {
  const card = words[activeIndex];

  elements.cardIndex.textContent = `${activeIndex + 1} / ${words.length}`;
  elements.word.textContent = card.word;
  elements.phonetic.textContent = card.phonetic;
  elements.meaning.textContent = card.meaning;
  elements.example.textContent = card.example;
  elements.etymology.textContent = card.etymology;
  elements.aiNote.textContent = card.aiNote;
}

function nextCard() {
  activeIndex = (activeIndex + 1) % words.length;
  render();
}

function render() {
  renderQueue();
  renderCard();
}

document.querySelectorAll("[data-response]").forEach((button) => {
  button.addEventListener("click", nextCard);
});

document.querySelector(".sound-button").addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(words[activeIndex].word);
  utterance.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
});

render();
