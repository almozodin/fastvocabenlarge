const futureItems = [
  {
    label: "AI API",
    description: "Generate definitions and memory hooks",
  },
  {
    label: "Etymology",
    description: "Attach roots, prefixes, and origin notes",
  },
  {
    label: "Storage",
    description: "Save custom cards and review history",
  },
];

export function FuturePanel() {
  return (
    <aside className="future-panel" id="future" aria-labelledby="future-title">
      <div className="panel-header">
        <h2 id="future-title">Later</h2>
      </div>
      <ul className="future-list">
        {futureItems.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <small>{item.description}</small>
          </li>
        ))}
      </ul>
    </aside>
  );
}
