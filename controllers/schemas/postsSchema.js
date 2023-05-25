export default {
  getPosts : {
    response: {
        200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number"},
            title: { type: "string" },
            content: { type: "string" },
          }
        }
      }
    }
  }
}
