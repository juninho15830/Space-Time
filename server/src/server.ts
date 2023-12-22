/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)

// Configurar pasta uplodas como pública
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'), // Caminho da pasta
  prefix: '/uploads', // Prefixo da url antes do nome do arquivo
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('😁 HTTP server running on http://localhost:3333')
  })
