import { apiClient } from "../apiClient";
import { ResponseDto } from "../dtos/response.dto";

export const getCharacters = (): Promise<ResponseDto> =>
  apiClient.get("/characters");
