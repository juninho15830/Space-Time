import { cookies } from "next/headers"; // 1 Importe os cookies
import { jwtDecode } from "jwt-decode"; // 6 Importe jwtDecode

interface User { // 2 Criar uma interface passando as informações do usuário
    sub: string
    name: string
    avatarUrl: string
}

export function getUser(): User { // 3 Cria uma função devolvendo o User
    const token = cookies().get('token')?.value // 4 Cria uma variável utilizando o cookie, temos que passar a informação que precisamos do cookie, se é o name ou value, que este caso é o value. Ele coloca uma ? automaticamente que significa que value pode ser undefined.

    if (!token) { // 5 Se o token não existe dispara um erro.
        throw new Error('Unauthenticated')
    }

    const user: User = jwtDecode(token) // 7 Se o token existe, usa a função jwtDecode no token.

    return user
}