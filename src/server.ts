import 'dotenv/config'
import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

const PORT = Number(process.env.PORT) || 3333
const HOST = process.env.HOST || '0.0.0.0'

fastify.get('/', async () => {
  return { ok: true, message: 'Auth API' }
})

fastify.get('/health', async () => {
  return { status: 'ok' }
})

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST })
    console.log(`Servidor rodando em http://${HOST}:${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
