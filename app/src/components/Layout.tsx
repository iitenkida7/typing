import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 pb-16">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
