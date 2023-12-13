import { api } from "@/lib/api"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    const registerResponse = await api.post('/register', {
        code,
    }) 

    const { token } = registerResponse.data
    
    const redirectURL = new URL('/', request.url) 

    const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // Esta variavel está salvando o tempo de duração em segundos do nosso cookie, onde 60 segundos vezes 60 = 1 hora que vezes 24 = 1 dia que vezes 30 = 1 mês

    return NextResponse.redirect(redirectURL, { 
        headers: {
            'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`
        } // Passamos a propriedade max-age interpolando com a variavel de 1 mês.
    }) 
}