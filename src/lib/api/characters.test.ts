import { getCharacters } from "./character";
import { apiClient } from "../apiClient";

jest.mock("../apiClient", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("getCharacters API", () => {
  it("returns characters when API call succeeds", async () => {
    const mockData = { results: [{ id: 1, name: "Homer" }] };

    (apiClient.get as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await getCharacters();

    expect(apiClient.get).toHaveBeenCalledWith("/characters");
    expect(result).toEqual(mockData);
  });

  it("throws error when API call fails", async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(getCharacters()).rejects.toThrow("Network error");
  });
});
