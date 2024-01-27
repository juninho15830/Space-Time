import { api } from '@/lib/api'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import ptBr from "dayjs/locale/pt-br"

dayjs.locale(ptBr)

type Props = {
  params: {
    id: string
  }
}

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
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
    <section className="flex flex-col gap-10 p-8">
      <Link
        href="/"
        className="flex items-center text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a linha do tempo
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap w-full justify-between ">
          <time className="ml-8 flex items-center gap-2 text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memoryDetail.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <button
            className=" text-gray-200 hover:text-red-400 duration-200 pr-8"
            type="button"
          >
            <Trash2 size={20} className="" />
          </button>
        </div>
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
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
          alt=""
        />

        <p className="text-lg leading-relaxed text-gray-100">
          {memoryDetail.content}
        </p>
      </div>
    </section>
  )
}