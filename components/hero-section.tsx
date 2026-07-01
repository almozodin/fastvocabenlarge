export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="page-title">
      <div className="hero-copy">
        <p className="eyebrow">Minimal word-card workspace</p>
        <h1 id="page-title">A quiet place to grow vocabulary.</h1>
        <p className="hero-text">
          先把卡片体验、信息层级和未来 AI/词源入口搭好。内容可以慢慢长出来，架构先保持清爽。
        </p>
      </div>
      <div className="hero-panel" aria-label="Today overview">
        <div>
          <span className="metric-label">Today</span>
          <strong className="metric-value">0</strong>
          <span className="metric-caption">cards scheduled</span>
        </div>
        <div>
          <span className="metric-label">Mode</span>
          <strong className="metric-value compact">Draft</strong>
          <span className="metric-caption">content-ready shell</span>
        </div>
      </div>
    </section>
  );
}
