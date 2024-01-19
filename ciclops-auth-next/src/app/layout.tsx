import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link';
// import AuthStatus from "../components/authStatus"
import { SessionProvider } from 'next-auth/react'
import SessionProviderWrapper from './sessionProviderWrapper';

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'My demo',
  description: 'Some description for my website',
}

export default function RootLayout({ children }: any) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-row">
            <div className="w-4/5 p-3 h-screen bg-black">{children}</div>
            <div className="w-1/5 p-3 h-screen bg-gray-700">
              <h2 className="text-3xl">Demo - frontend</h2>
              {/* <AuthStatus /> */}
              <hr />
              <ul className="mt-3">
                <li className="my-1"><Link className="hover:bg-gray-500" href="/">Home</Link></li>
                <li className="my-1"><Link className="hover:bg-gray-500" href="/products">Products</Link></li>
                <li className="my-1"><Link className="hover:bg-gray-500" href="/products/create">Create product</Link></li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    </SessionProviderWrapper>
  )
}