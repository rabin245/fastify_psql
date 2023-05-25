import fp from "fastify-plugin";
import pg from "@fastify/postgres";
import * as dotenv from "dotenv";
dotenv.config();

export default fp(async function (fastify, opts) {
  fastify.register(pg, {
    user: process.env.PSQLUSER,
    password: process.env.PSQLPASSWORD,
    database: process.env.PSQLDATABASE,
    host: process.env.PSQLHOST,
    port: process.env.PSQLPORT,
  });
});
