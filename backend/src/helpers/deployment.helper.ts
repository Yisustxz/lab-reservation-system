import { ServicesConfig } from './services.config';

export type DeploymentType = 'local' | 'kubernetes' | 'multi-cluster';

export class DeploymentHelper {
  static getDeploymentType(): DeploymentType {
    if (process.env.NODE_ENV === 'development') {
      return 'local';
    }

    if (process.env.KUBERNETES_SERVICE_HOST) {
      return 'kubernetes';
    }

    if (process.env.DEPLOYMENT_TYPE === 'multi-cluster') {
      return 'multi-cluster';
    }

    return 'local';
  }

  static getMicroservicePort(serviceName: ServiceName): number {
    const service = ServicesConfig.getServiceByName(serviceName);

    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    return service.port;
  }

  static getMicroserviceUrl(serviceName: ServiceName): string {
    const deploymentType = this.getDeploymentType();

    switch (deploymentType) {
      case 'local':
        return (
          process.env[`BACKEND_${serviceName.toUpperCase()}_LOCAL_URL`] ||
          `http://localhost:${this.getDefaultPort(serviceName)}`
        );

      case 'kubernetes':
        return (
          process.env[`BACKEND_${serviceName.toUpperCase()}_SERVICE_URL`] ||
          `http://backend-${serviceName}:${this.getDefaultPort(serviceName)}`
        );

      case 'multi-cluster':
        return (
          process.env[`BACKEND_${serviceName.toUpperCase()}_NODEPORT_URL`] ||
          process.env[`BACKEND_${serviceName.toUpperCase()}_SERVICE_URL`] ||
          `http://backend-${serviceName}:${this.getDefaultPort(serviceName)}`
        );

      default:
        return `http://localhost:${this.getDefaultPort(serviceName)}`;
    }
  }

  static getDefaultPort(serviceName: ServiceName): number {
    const service = ServicesConfig.getServiceByName(serviceName);

    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    return service.port;
  }

  static getMicroserviceHealthUrl(serviceName: ServiceName): string {
    return this.getMicroserviceUrl(serviceName) + '/health';
  }

  static getEnvironmentInfo() {
    return {
      deploymentType: this.getDeploymentType(),
      nodeEnv: process.env.NODE_ENV,
      hasKubernetesServiceHost: !!process.env.KUBERNETES_SERVICE_HOST,
      explicitDeploymentType: process.env.DEPLOYMENT_TYPE,
      availableServices: ServicesConfig.getAllServices(),
    };
  }
}

export enum ServiceName {
  BACKEND_PERSONS = 'backend-persons',
  BACKEND_COMPUTERS = 'backend-computers',
  BACKEND_RESERVATIONS = 'backend-reservations',
}
