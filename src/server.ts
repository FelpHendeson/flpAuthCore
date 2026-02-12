import 'dotenv/config'
import appInstance from './app'

const PORT = Number(process.env.PORT) || 3333
const HOST = process.env.HOST || '0.0.0.0'

const app = await appInstance();

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST })
    console.log(`Servidor rodando em http://${HOST}:${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
