import postsHandler from '../controllers/handlers/postsHandler.js'
import postsSchema from '../controllers/schemas/postsSchema.js'

const getPostsOption = {
  schema: postsSchema.getPosts,
  handler: postsHandler.getPosts
}

export default async function (fastify, opts) {
  fastify.get('/posts', getPostsOption )
}
