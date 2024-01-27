import SearchBar from '@/components/Teste'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: {
    id: string
  }
}

interface Memory {
  id: string
  coverUrl: string
  content: string
  createAt: string
  isPublic: boolean
}

export default async function Page({ params }: Props) {
  const paramsId = params.id.slice(3, params.id.length)
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${paramsId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const memoryDetail: Memory = response.data

  return (
    <section className="flex max-h-screen flex-col gap-4 overflow-auto p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <SearchBar memory={params} />
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          {memoryDetail.isPublic ? (
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
          src={memoryDetail.coverUrl}
          width={960}
          height={540}
          className="aspect-video w-full rounded-lg object-cover"
          alt=""
        />

        <p className="mt-2 h-80 w-full max-w-[1000px] flex-1 resize-none rounded border-0 bg-transparent p-1 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0">
          {memoryDetail.content}
        </p>
      </div>
    </section>
  )
}