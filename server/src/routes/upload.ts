import { randomUUID } from 'node:crypto'
import path, { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import fs from 'fs';

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  
  app.post('/upload', async (request, reply) => {
  
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!upload) {
      return reply.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', 'uploads', fileName),
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })

  app.delete('/uploads/:fileName', async (request, reply) => {
    const { fileName } = request.params as { fileName: string };
    
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'uploads', fileName);
      fs.unlinkSync(filePath);
      return reply.status(200).send('Arquivo excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir o arquivo:', error);
      return reply.status(500).send('Erro ao excluir o arquivo');
    }
  })
}