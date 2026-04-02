import Fastify from 'fastify';
import appRoutes from './routes/routes';

const appInstance = async () => {
    const app = Fastify({ logger: true })

    app.register(appRoutes);

    return app;
}

export default appInstance;