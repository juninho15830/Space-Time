import { NextRequest, NextResponse } from "next/server";// 1 importe

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) { //2 cria a função middleware
    const token = request.cookies.get('token')?.value //4 peg o token de autenticação

    if (!token) { // 5 se o token de autenticação não redireciona o usuário para login e cria um token de rota para redirecionar o usuário para a url que estava tentando acessar.
        return NextResponse.redirect(signInURL, {
            headers: {
                'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
            },
        })
    }

    return NextResponse.next() // 6 se o token existe, deixa o usuário prosseguir
}

export const config = { // 3 vairiavel config passando as url que farão uso do middleware
    matcher: '/memories/:path*',
}