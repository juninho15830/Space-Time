import { getUser } from "@/lib/auth";
import Image from "next/image"; // 1 Importe Image

export function Profile() {
  const { name, avatarUrl } = getUser() // 2 Vamos pegar o campo avatarUrl

  return(
      <div className="flex items-center gap-3 text-left">
         {/* 3 Configurar a tag Image*/}
        <Image 
          src={avatarUrl} 
          width={40} 
          height={40} 
          alt="" 
          className="h-10 w-10 rounded-full"
        />

        <p className="text-sm leading-snug max-w-[140px]">
          {name}
          <a href="" className="block text-red-400 hover:text-red-300">
            Quero sair
          </a>
        </p>
      </div>
  )
}