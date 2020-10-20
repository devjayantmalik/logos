const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("static"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = 4500;
app.listen(port, () => {
  console.log("Application started at: http://localhost:" + port);
});
