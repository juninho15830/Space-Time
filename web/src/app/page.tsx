import { cookies } from "next/headers" // Importe cookies
import { Copyright } from "@/components/Copyright"
import { Hero } from "@/components/Hero"
import { SignIn } from "@/components/SignIn"
import { Profile } from "@/components/Profile"
import { EmptyMemories } from "@/components/EmptyMemories"

export default function Home() {
  const isAuthenticated = cookies().has('token')

  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">

        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 -translate-y-1/2 rounded-full translate-x-1/2 blur-full"/>

        {/* Stripes */}
        <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

        {isAuthenticated ? <Profile /> : <SignIn />} {/* Se isAuthenticates mostre Profile se não mostre sign */}

        <Hero />
          
        <Copyright />

      </div>

      {/* Right */}
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  )
}
