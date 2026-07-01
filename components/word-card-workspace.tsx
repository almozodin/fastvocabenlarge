"use client";

import { useState } from "react";

import type { WordCard } from "@/lib/word-cards";

type WordCardWorkspaceProps = {
  cards: WordCard[];
};

export function WordCardWorkspace({ cards }: WordCardWorkspaceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = cards[activeIndex] ?? cards[0];

  function goToNextCard() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % cards.length);
  }

  function playPronunciation() {
    if (!("speechSynthesis" in window) || !activeCard) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(activeCard.word);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  if (!activeCard) {
    return null;
  }

  return (
    <>
      <aside className="queue-panel" id="queue" aria-labelledby="queue-title">
        <div className="panel-header">
          <h2 id="queue-title">Queue</h2>
          <span className="count-pill">{cards.length}</span>
        </div>
        <div className="queue-list">
          {cards.map((card, index) => (
            <button
              className={`queue-item${index === activeIndex ? " active" : ""}`}
              key={card.word}
              type="button"
              onClick={() => setActiveIndex(index)}
            >
              <strong>{card.word}</strong>
              <span>{card.meaning}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="card-stage" id="card" aria-live="polite">
        <article className="word-card">
          <div className="card-topline">
            <span className="tag">Word Card</span>
            <span className="card-index">
              {activeIndex + 1} / {cards.length}
            </span>
          </div>

          <div className="word-head">
            <h2>{activeCard.word}</h2>
            <button
              className="sound-button"
              type="button"
              aria-label="Play pronunciation"
              onClick={playPronunciation}
            >
              <span aria-hidden="true">♪</span>
            </button>
          </div>
          <p className="phonetic">{activeCard.phonetic}</p>

          <dl className="word-details">
            <div>
              <dt>Meaning</dt>
              <dd>{activeCard.meaning}</dd>
            </div>
            <div>
              <dt>Example</dt>
              <dd>{activeCard.example}</dd>
            </div>
            <div>
              <dt>Etymology</dt>
              <dd>{activeCard.etymology}</dd>
            </div>
            <div>
              <dt>AI Note</dt>
              <dd>{activeCard.aiNote}</dd>
            </div>
          </dl>

          <div className="card-actions" aria-label="Learning response">
            <button className="response secondary" type="button" onClick={goToNextCard}>
              不认识
            </button>
            <button className="response secondary" type="button" onClick={goToNextCard}>
              模糊
            </button>
            <button className="response primary" type="button" onClick={goToNextCard}>
              熟悉
            </button>
          </div>
        </article>
      </section>
    </>
  );
}
