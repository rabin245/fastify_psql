export default {
  getPosts : async (request, reply) => {
    const conn = await request.server.pg.connect();
    try {

      const {rows} = await conn.query('select * from posts');
      
      if (rows.length === 0) {
        reply.code(404).send({error: 'Not Found'});
      }

      return rows;
    } catch (error) {
      console.log(error);
      reply.code(500).send({error: 'Internal Server Error'});
    } finally {
      conn.release();
    }
  }
}
