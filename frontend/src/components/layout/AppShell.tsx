import type { ReactNode } from 'react';
import TopNav from './TopNav';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <TopNav />
      <main>{children}</main>
    </div>
  );
}