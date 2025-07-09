import apiClient from "../utils/apiClient";

export interface HealthResponse {
  status: string;
  timestamp: string;
  service?: string;
}

export const checkApiGatewayHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>("/health");
  return response.data;
};

export const checkBackendPersonsHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>(
    "http://localhost:3002/health"
  );
  return response.data;
};

export const checkBackendComputersHealth =
  async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>(
      "http://localhost:3000/health"
    );
    return response.data;
  };

export const checkBackendReservationsHealth =
  async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>(
      "http://localhost:3003/health"
    );
    return response.data;
  };

export const checkAllServicesHealth = async (): Promise<{
  apiGateway: HealthResponse | null;
  backendPersons: HealthResponse | null;
  backendComputers: HealthResponse | null;
  backendReservations: HealthResponse | null;
}> => {
  const results = {
    apiGateway: null as HealthResponse | null,
    backendPersons: null as HealthResponse | null,
    backendComputers: null as HealthResponse | null,
    backendReservations: null as HealthResponse | null,
  };

  try {
    results.apiGateway = await checkApiGatewayHealth();
  } catch (error) {
    console.error("API Gateway health check failed:", error);
  }

  try {
    results.backendPersons = await checkBackendPersonsHealth();
  } catch (error) {
    console.error("Backend Persons health check failed:", error);
  }

  try {
    results.backendComputers = await checkBackendComputersHealth();
  } catch (error) {
    console.error("Backend Computers health check failed:", error);
  }

  try {
    results.backendReservations = await checkBackendReservationsHealth();
  } catch (error) {
    console.error("Backend Reservations health check failed:", error);
  }

  return results;
};
