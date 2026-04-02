import { FastifyInstance } from "fastify";
import userController from "../user/user.controller";

const appRoutes = async (app: FastifyInstance) => {

    app.get('/', async () => {
        return { ok: true, message: 'Auth API' }
    });

    app.get('/health', async () => {
        return { status: 'ok' }
    });

    app.post('/users', async () => {

    });
};

export default appRoutes;