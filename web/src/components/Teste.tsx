'use client'

import { useParams } from 'next/navigation'

type Props = {
  memory: any
}

export default function SearchBar({ memory }: Props) {
  const params = useParams()
  memory = params

  return <> </>
}