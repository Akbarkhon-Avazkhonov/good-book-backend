/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// lib/paapi.ts
import * as aws4 from 'aws4'; // ✅ ПРАВИЛЬНО

export async function callPAAPI(payload: Record<string, any>, target: string) {
  const host = 'webservices.amazon.com';
  const path = '/paapi5/' + target.toLowerCase();
  const body = JSON.stringify(payload);
  if (!process.env.AMAZON_ACCESS_KEY || !process.env.AMAZON_SECRET_KEY) {
    throw new Error('Amazon API keys are not set in environment variables');
  }
  const opts = {
    host,
    path,
    method: 'POST',
    service: 'ProductAdvertisingAPI',
    region: 'us-east-1',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Amz-Target': `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${target}`,
      'Content-Encoding': 'amz-1.0',
      'User-Agent': 'paapi-docs-fetch/1.0.0',
    },
    body,
  };

  aws4.sign(opts, {
    accessKeyId: process.env.AMAZON_ACCESS_KEY!,
    secretAccessKey: process.env.AMAZON_SECRET_KEY!,
  });

  const response = await fetch(`https://${host}${path}`, {
    method: 'POST',
    headers: opts.headers as HeadersInit,
    body: opts.body,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: data?.Errors?.[0]?.Message || 'Unknown error',
    };
  }

  return { ok: true, data };
}
