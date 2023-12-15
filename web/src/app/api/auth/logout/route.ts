import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    const redirectURL = new URL('/', request.url) 

    return NextResponse.redirect(redirectURL, { 
        headers: {
            'Set-Cookie': `token=; Path=/; max-age=0`
        } 
    }) // Para apagarmos o cookie que salva o token apenas precisamos deixa-lo sem valor e passar o max-age como 0.
}