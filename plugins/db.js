import fp from "fastify-plugin";
import pg from "@fastify/postgres";

export default fp(async function (fastify, opts) {
  fastify.register(pg, {
    user: "zaxiya",
    password: "Sqlp@ssw0rd",
    database: "fastify_psql",
    host: "localhost",
    port: 5432,
  });
});
