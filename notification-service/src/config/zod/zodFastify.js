import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { ErrorHandler } from "@/errorHandler.js";
import fastify from "fastify";
export const CreateZodFastify = () => {
    const app = fastify().withTypeProvider();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);
    app.setErrorHandler(ErrorHandler);
    return app;
};
