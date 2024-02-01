import type { Metadata } from 'next'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'
import { Providers } from '@/providers/Providers'

const roboto = Roboto({ 
  subsets: ['latin'],
  variable: '--font-roboto'
})

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata: Metadata = {
  title: 'Spacetime',
  description: 'Uma cápsula do tempo construida com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({children,}: {children: ReactNode}) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body 
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 text-gray-100 font-sans`}
      >
        <Providers>
          <main className="grid min-h-screen grid-cols-2">
              {/* Left */}
            <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
              {/* Blur */}
              <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 -translate-y-1/2 rounded-full translate-x-1/2 blur-full"/>
              {/* Stripes */}
              <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />
              {isAuthenticated ? <Profile /> : <SignIn />}
              <Hero />
          
              <Copyright />
            </div>
            {/* Right */}
            <div className="flex flex-col max-h-screen overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
