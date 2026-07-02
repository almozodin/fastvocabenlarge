type AppCardProps = {
  title: string;
  description: string;
  href?: string;
};

export function AppCard({ title, description, href }: AppCardProps) {
  const content = (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );

  if (href) {
    return (
      <a className="app-card" href={href}>
        {content}
      </a>
    );
  }

  return <div className="app-card">{content}</div>;
}
