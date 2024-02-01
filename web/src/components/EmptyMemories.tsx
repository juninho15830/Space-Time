export function EmptyMemories() {
    return (
        <div className="flex flex-1 items-center justify-center  p-16 ">
          <p className="text-center leading-relaxed w-[360px]">Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a href="/memories/new" className="underline hover:text-gray-50">criar agora</a>!</p>
        </div>
    )
}