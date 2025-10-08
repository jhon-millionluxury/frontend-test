import { getProperties } from "./getProperties";
import { apiClient } from "../apiClient";

jest.mock("../apiClient", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("Get Properties API", () => {
  it("returns properties when API call succeeds", async () => {
    const mockData = { results: [{ id: 1, name: "Homer" }] };

    (apiClient.get as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await getProperties();

    expect(apiClient.get).toHaveBeenCalledWith("/Property");
    expect(result).toEqual(mockData);
  });

  it("throws error when API call fails", async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(getProperties()).rejects.toThrow("Network error");
  });
});
