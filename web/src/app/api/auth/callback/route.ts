import { api } from "@/lib/api"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    const redirectTo = request.cookies.get('redirectTo')?.value // 7 cria a variavel que recebe o cookie que salva a url que usuário estava tentando acessar sem estar logado.

    const registerResponse = await api.post('/register', {
        code,
    }) 

    const { token } = registerResponse.data
    
    const redirectURL = redirectTo ?? new URL('/', request.url) // 8 usa a variavel para redirecionar o usuário para a url que estava tentando acessar sem estar logado. 

    const cookieExpiresInSeconds = 60 * 60 * 24 * 30 

    return NextResponse.redirect(redirectURL, { 
        headers: {
            'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`
        } 
    }) 
}