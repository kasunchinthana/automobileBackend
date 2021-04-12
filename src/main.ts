import { NestFactory } from '@nestjs/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'graphql';
import { createConnection } from 'node:net';
import { AppModule } from './app.module';
import { VehicleResolver } from './vehicle/vehicle.resolver';

async function bootstrap() {

  // createConnection();
  // const schema = buildSchema({ resolvers: [VehicleResolver] });
  // const server = new ApolloServer({ schema });

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);

  
  // const connection = await createConnection()
  //  const schema = await buildSchema({
  //    resolvers: [VehicleResolver] // add this
  //  })
 
}
bootstrap();
