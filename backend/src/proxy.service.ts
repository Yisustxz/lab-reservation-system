import { Injectable } from '@nestjs/common';

@Injectable()
export class ProxyService {
  private async makeRequest(url: string, method: string, body?: any) {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          status: response.status,
          data: errorData,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        status: response.status,
        data,
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        data: null,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async get(serviceUrl: string, path: string) {
    return this.makeRequest(`${serviceUrl}${path}`, 'GET');
  }

  async post(serviceUrl: string, path: string, body: any) {
    return this.makeRequest(`${serviceUrl}${path}`, 'POST', body);
  }

  async put(serviceUrl: string, path: string, body: any) {
    return this.makeRequest(`${serviceUrl}${path}`, 'PUT', body);
  }

  async delete(serviceUrl: string, path: string) {
    return this.makeRequest(`${serviceUrl}${path}`, 'DELETE');
  }
}
