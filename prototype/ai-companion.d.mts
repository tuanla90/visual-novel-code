import type { IncomingMessage, ServerResponse } from 'node:http';

export function createCompanionHandler(options?: {
  fetchImpl?: typeof fetch;
  env?: Record<string, string | undefined>;
}): (request: IncomingMessage, response: ServerResponse) => Promise<boolean>;
