import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        host: env('PGHOST'),
        port: env.int('PGPORT', 5432),
        database: env('PGDATABASE'),
        user: env('PGUSER'),
        password: env('PGPASSWORD'),
        ssl: { rejectUnauthorized: false },
        schema: 'public',
      },
      pool: {
        min: 0,
        max: 5,
      },
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
      acquireConnectionTimeout: env.int(
        'DATABASE_CONNECTION_TIMEOUT',
        60000
      ),
    },
  };
};
