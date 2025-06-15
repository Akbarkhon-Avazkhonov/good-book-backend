/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// lib/redis.ts
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST, // или '127.0.0.1'
  port: parseInt(process.env.REDIS_PORT || '6379'),
  username: process.env.REDIS_USERNAME, // если нужно
  password: process.env.REDIS_PASSWORD, // если нужно
});

export default redis;
