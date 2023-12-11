import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token', // Endereço do GitHub
      null, // Como não tem o corpo da requisição, temos que passar nulo
      {
        // Configurações da requisição
        params: {
          // Parametros que vão na url
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          // Cabeçalhos "metadados da requsição"
          Accept: 'application/json', // Pede para retornar a resposta no formato json
        },
      },
    )

    const { access_token } = accessTokenResponse.data // Aqui ele recebe o Access Token da resposta da requisição

    return {
      access_token,
    }
  })
}
