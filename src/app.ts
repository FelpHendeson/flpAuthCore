import Fastify from 'fastify'

const appInstance = async () => {
    const app = Fastify({ logger: true })

    app.get('/', async () => {
        return { ok: true, message: 'Auth API' }
    })

    app.get('/health', async () => {
        return { status: 'ok' }
    })

    return app;
}

export default appInstance;