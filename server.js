const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
const port = 4000;

const schema = buildSchema(`
  type Query {
    posts: [Post],
    comments: [Comment]
  }
  
  type Post {
    id: ID!
    title: String!
    description: String!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String!
    likes: Int
  }
  
  `);

const root = {
  posts: [
    {
      id: "post1",
      title: "It is a first post",
      description: "It is a first post description",
      comments: [
        {
          id: "comment1",
          text: "It is a first comment",
          likes: 1,
        },
      ],
    },
    {
      id: "post1",
      title: "It is a first post",
      description: "It is a first post description",
      comments: [],
    },
  ],
  comments: [
    {
      id: "comment1",
      text: "It is a first comment",
      likes: 1,
    },
  ],
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(
    `Running a GraphQl API server at http://localhost:${port}/graphql`
  );
});
