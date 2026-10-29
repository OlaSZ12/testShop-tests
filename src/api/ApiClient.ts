import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  // Ścieżki względne (bez wiodącego "/"), aby zachować prefiks /api z baseURL.
  get(path: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return this.request.get(path, { params });
  }

  post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(path, { data });
  }

  put(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.put(path, { data });
  }

  delete(path: string): Promise<APIResponse> {
    return this.request.delete(path);
  }
}
