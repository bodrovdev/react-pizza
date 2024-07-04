import { ReactNode } from "react";
import Header from "./Header";
import StickyMenu from "./StickyMenu";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main className="page-content">
        {children}
      </main >

      <StickyMenu />

    </>
  )
}

export default Layout