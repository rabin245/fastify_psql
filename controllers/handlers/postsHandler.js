export default {
  getPosts: async (request, reply) => {
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
  },
  getPostById: async (request, reply) => {
    const conn = await request.server.pg.connect();
    const {id} = request.params;

    try {
     const {rows} = await conn.query('select * from posts where id = $1', [id]);

     if (rows.length === 0) {
       reply.code(404).send({error: 'Not Found'});
     }

     return rows[0];
    } catch (error) {
      console.log(error);
      reply.code(500).send({error: 'Internal Server Error'});
    } finally {
      conn.release();
    }
  },
  createPost: async (request, reply) => {
    const conn = await request.server.pg.connect();
    const {title, content} = request.body;
    try {
      const {rows} = await conn.query('insert into posts (title, content) values ($1, $2) returning *', [title, content]);
      return rows[0];
    } catch (error) {
      console.log(error);
      reply.code(500).send({error: 'Internal Server Error'});
    } finally {
      conn.release();
    }
  },
  deletePost: async (request, reply) => {
    const conn = await request.server.pg.connect();
    const {id} = request.params;
    try {
      const {rows} = await conn.query('delete from posts where id = $1 returning *', [id]);
      if (rows.length === 0) {
        reply.code(404).send({error: 'Not Found'});
      }
      return rows[0];
    } catch (error) {
      console.log(error);
      reply.code(500).send({error: 'Internal Server Error'});
    } finally {
      conn.release();
    }
  },
  updatePost: async (request, reply) => {
    const conn = await request.server.pg.connect();
    const {id} = request.params;
    const {title, content} = request.body;
    try {
      const {rows} = await conn.query('update posts set title = $1, content = $2 where id = $3 returning *', [title, content, id]);

      if (rows.length === 0) {
        reply.code(404).send({error: 'Not Found'});
      }

      return rows[0];
    } catch (error) {
      console.log(error);
      reply.code(500).send({error: 'Internal Server Error'});
    } finally {
      conn.release();
    }
  }
}
