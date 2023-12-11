import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: [
    'https://www.exemplo1.alguma.coisa',
    'https://www.exemplo2.alguma.coisa/outracoisa',
  ],
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('😁 HTTP server running on http://localhost:3333')
  })
