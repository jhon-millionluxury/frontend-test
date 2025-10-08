import { apiClient } from "../apiClient";
import { GetPropertiesFilters, ResponseDto } from "../dtos";

export const getProperties = (
  filters: GetPropertiesFilters = {}
): Promise<ResponseDto> => {
  const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);

  if (filters.address) params.append("address", filters.address);

  if (filters.minPrice !== undefined)
    params.append("minPrice", filters.minPrice.toString());

  if (filters.maxPrice !== undefined)
    params.append("maxPrice", filters.maxPrice.toString());

  if (filters.page !== undefined)
    params.append("page", filters.page.toString());

  if (filters.pageSize !== undefined)
    params.append("pageSize", filters.pageSize.toString());

  return apiClient.get(`/Property?${params.toString()}`);
};
