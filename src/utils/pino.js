import pinoHTTP from 'pino-http';

export const logger = () => {
  return pinoHTTP({
    transport: {
      target: 'pino-pretty',
    },
  });
};
