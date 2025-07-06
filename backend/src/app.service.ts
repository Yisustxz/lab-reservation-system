import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Lab Reservation System Backend is running!';
  }

  getSystemHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'backend-main',
      environment: process.env.NODE_ENV,
      port: process.env.PORT,
    };
  }

  async getAllMicroservicesHealth() {
    const services = [
      {
        name: 'backend-persons',
        url: process.env.BACKEND_PERSONS_SERVICE_URL!,
        port: process.env.BACKEND_PERSONS_SERVICE_PORT!,
      },
      {
        name: 'backend-computers',
        url: process.env.BACKEND_COMPUTERS_SERVICE_URL!,
        port: process.env.BACKEND_COMPUTERS_SERVICE_PORT!,
      },
      {
        name: 'backend-reservations',
        url: process.env.BACKEND_RESERVATIONS_SERVICE_URL!,
        port: process.env.BACKEND_RESERVATIONS_SERVICE_PORT!,
      },
    ];

    const results = await Promise.allSettled(
      services.map(async (service) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(`${service.url}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            return {
              name: service.name,
              status: 'ERROR',
              port: service.port,
              details: `HTTP ${response.status}: ${response.statusText}`,
              timestamp: new Date().toISOString(),
              url: service.url,
            };
          }

          const data = await response.json();
          return {
            name: service.name,
            status: data.status || 'OK',
            port: service.port,
            details: data.details || 'Service is healthy',
            timestamp: data.timestamp || new Date().toISOString(),
            url: service.url,
          };
        } catch (error) {
          let errorMessage = 'Connection failed';
          let status = 'ERROR';

          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              errorMessage = 'Request timeout (5s)';
            } else if (error.message.includes('ECONNREFUSED')) {
              errorMessage = 'Connection refused - service may be down';
            } else if (error.message.includes('ENOTFOUND')) {
              errorMessage = 'Service not found - DNS resolution failed';
            } else if (
              error.message.includes('database') ||
              error.message.includes('DB')
            ) {
              errorMessage = error.message;
              status = 'BDDERROR';
            } else {
              errorMessage = error.message;
            }
          }

          return {
            name: service.name,
            status: status,
            port: service.port,
            details: errorMessage,
            timestamp: new Date().toISOString(),
            url: service.url,
          };
        }
      }),
    );

    const serviceResults = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          name: services[index].name,
          status: 'ERROR',
          port: services[index].port,
          details: 'Promise rejected unexpectedly',
          timestamp: new Date().toISOString(),
          url: services[index].url,
        };
      }
    });

    const healthyServices = serviceResults.filter((s) => s.status === 'OK');
    const bdErrorServices = serviceResults.filter(
      (s) => s.status === 'BDDERROR',
    );
    const errorServices = serviceResults.filter((s) => s.status === 'ERROR');

    let overallStatus = 'OK';
    if (errorServices.length > 0) {
      overallStatus = 'ERROR';
    } else if (bdErrorServices.length > 0) {
      overallStatus = 'BDDERROR';
    }

    return {
      overall: {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        total_services: serviceResults.length,
        healthy_services: healthyServices.length,
        database_error_services: bdErrorServices.length,
        error_services: errorServices.length,
      },
      services: serviceResults,
      summary: {
        healthy: healthyServices.map((s) => s.name),
        database_errors: bdErrorServices.map((s) => s.name),
        errors: errorServices.map((s) => s.name),
      },
    };
  }
}
