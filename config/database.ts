import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        host: env('DATABASE_HOST'),           // Railway host
        port: env.int('DATABASE_PORT', 5432), // Railway port
        database: env('DATABASE_NAME'),       // Railway database name
        user: env('DATABASE_USERNAME'),       // Railway user
        password: env('DATABASE_PASSWORD'),   // Railway password
        ssl: env.bool('DATABASE_SSL', false)
          ? { rejectUnauthorized: false }     // SSL override if true
          : false,
      },
      pool: { min: 0, max: 5 },
    },

    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: 60000,
    },
  };
};
