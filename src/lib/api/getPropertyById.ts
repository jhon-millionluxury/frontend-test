import { apiClient } from "../apiClient";
import { PropertyDto } from "../dtos";

export const getPropertyById = (id: string): Promise<PropertyDto> => {
  return apiClient.get(`/Property/${id}`);
};
