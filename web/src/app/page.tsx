import { EmptyMemories } from "@/components/EmptyMemories";
import { Memories } from "@/components/Memories";
import { cookies } from "next/headers"

export default async function Home() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  return (
    <Memories />
  )
}