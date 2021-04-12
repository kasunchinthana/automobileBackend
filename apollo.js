import pg from 'pg';
import { ApolloServer } from 'apollo-server';
import { makeSchemaAndPlugin } from 'postgraphile-apollo-server';
export default async () => {
    const pgPool = new pg.Pool({
      "user": "postgres",
      "database": "postgres",
      "password": "abc123",
      "host": "localhost"
    });
const {schema, plugin} = await makeSchemaAndPlugin(
        pgPool,
        'automobile',
        { dynamicJson: true }
    );
const server = new ApolloServer({schema, plugins: [plugin]});
return server.listen({ port: 5000 }).then(({url}) => {
      console.log(`Apollo Server ready at ${url}`);
    }).catch(e => console.error(e));
  }
