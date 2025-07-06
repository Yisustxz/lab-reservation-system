import { ServiceName } from './deployment.helper';

export interface ServiceConfig {
  name: string;
  serviceName: ServiceName;
  port: number;
  description: string;
}

export const MICROSERVICES_CONFIG: ServiceConfig[] = [
  {
    name: 'backend-persons',
    serviceName: ServiceName.BACKEND_PERSONS,
    port: parseInt(process.env.BACKEND_PERSONS_SERVICE_PORT + ''),
    description: 'User management and authentication service',
  },
  {
    name: 'backend-computers',
    serviceName: ServiceName.BACKEND_COMPUTERS,
    port: parseInt(process.env.BACKEND_COMPUTERS_SERVICE_PORT + ''),
    description: 'Laboratory and computer management service',
  },
  {
    name: 'backend-reservations',
    serviceName: ServiceName.BACKEND_RESERVATIONS,
    port: parseInt(process.env.BACKEND_RESERVATIONS_SERVICE_PORT + ''),
    description: 'Reservation management and scheduling service',
  },
];

export class ServicesConfig {
  static getAllServices(): ServiceConfig[] {
    return MICROSERVICES_CONFIG;
  }

  static getServiceByName(serviceName: ServiceName): ServiceConfig | undefined {
    return MICROSERVICES_CONFIG.find(
      (service) => service.serviceName === serviceName,
    );
  }

  static getServiceNames(): string[] {
    return MICROSERVICES_CONFIG.map((service) => service.serviceName);
  }

  static getServicePorts(): Record<string, number> {
    return MICROSERVICES_CONFIG.reduce(
      (ports, service) => {
        ports[service.serviceName] = service.port;
        return ports;
      },
      {} as Record<string, number>,
    );
  }
}
