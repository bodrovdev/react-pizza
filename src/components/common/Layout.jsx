import Header from "./Header";

function Layout({ children }) {
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