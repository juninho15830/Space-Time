import { EmptyMemories } from "@/components/EmptyMemories"
import { cookies } from "next/headers"
import { api } from "@/lib/api"
import dayjs from "dayjs"
import ptBr from "dayjs/locale/pt-br"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Trash2 } from "lucide-react"

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  except: string
  createdAt: string
  isPublic: boolean
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
  
    <section className="flex flex-col gap-10 p-8">
      <h1>Linha do tempo</h1>
      <div>{memories.map(memory => {
        return (
          <div key={memory.id} className="space-y-4 pb-20">
            <div className="flex flex-wrap w-full justify-between ">
              <time className="ml-8 flex items-center gap-2 text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </time>
              
            </div>
            <div className="flex items-center gap-4">
              {memory.isPublic ? (
                <span className="rounded-lg border border-yellow-950 px-2 py-1 text-xs text-green-600">
                  público
                </span>
              ) : (
                <span className="rounded-lg border border-green-950 px-2 py-1 text-xs text-yellow-600">
                  privado
                </span>
              )}
            </div>
            <Image
              src={memory.coverUrl}
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
              alt=""
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.except}
            </p>
            <Link href={`memories/:${memory.id}`} className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100">
              Ler mais
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )
      })}
      </div>
    </section>
  )
}
