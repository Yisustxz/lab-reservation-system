import { Injectable } from '@nestjs/common';
import { DeploymentHelper, ServicesConfig } from './helpers';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! holaa';
  }

  async getSystemHealth() {
    const deploymentType = DeploymentHelper.getDeploymentType();
    const services = ServicesConfig.getAllServices();

    const microservices = services.map((service) => ({
      name: service.name,
      url: DeploymentHelper.getMicroserviceHealthUrl(service.serviceName),
      port: service.port,
      description: service.description,
    }));

    const results = await Promise.allSettled(
      microservices.map(async (service) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(service.url, {
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
              description: service.description,
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
            description: service.description,
          };
        } catch (error) {
          let errorMessage = 'Connection failed';
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              errorMessage = 'Request timeout (5s)';
            } else if (error.message.includes('ECONNREFUSED')) {
              errorMessage = 'Connection refused - service may be down';
            } else if (error.message.includes('ENOTFOUND')) {
              errorMessage = 'Service not found - DNS resolution failed';
            } else {
              errorMessage = error.message;
            }
          }

          return {
            name: service.name,
            status: 'ERROR',
            port: service.port,
            details: errorMessage,
            timestamp: new Date().toISOString(),
            url: service.url,
            description: service.description,
          };
        }
      }),
    );

    const serviceResults = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          name: microservices[index].name,
          status: 'ERROR',
          port: microservices[index].port,
          details: 'Promise rejected unexpectedly',
          timestamp: new Date().toISOString(),
          url: microservices[index].url,
          description: microservices[index].description,
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
        environment: deploymentType,
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
