import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="topbar" aria-label="Main navigation">
      <a className="brand" href="#" aria-label={`${siteConfig.name} home`}>
        <span className="brand-mark">F</span>
        <span>{siteConfig.shortName}</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        {siteConfig.navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
