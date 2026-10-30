export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Open Source", href: "#opensource" },
  { label: "Releases", href: "/releases" },
  { label: "Download DBNerd", href: "/download/dbnerd" },
];
