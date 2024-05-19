import { ReactNode } from "react";
import Header from "./Header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="page-content">
        {children}
      </main >
    </>
  )
}

export default Layout