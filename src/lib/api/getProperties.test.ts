import { getProperties } from "./getProperties";
import { apiClient } from "../apiClient";

jest.mock("../apiClient", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("getProperties", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls /Property without query params when no filters provided", async () => {
    const mockData = { results: [{ id: 1, name: "Homer" }] };

    (apiClient.get as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await getProperties();

    expect(apiClient.get).toHaveBeenCalledWith("/Property?");
    expect(result).toEqual(mockData);
  });

  it("calls /Property with filters as query params", async () => {
    const mockData = { results: [{ id: 2, name: "Luxury Villa" }] };

    (apiClient.get as jest.Mock).mockResolvedValueOnce(mockData);

    const filters = {
      name: "Luxury",
      address: "Miami",
      minPrice: 500000,
      maxPrice: 2000000,
      page: 1,
      pageSize: 10,
    };

    await getProperties(filters);

    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("/Property?")
    );

    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("name=Luxury")
    );
    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("address=Miami")
    );
    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("minPrice=500000")
    );
    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("maxPrice=2000000")
    );
    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("page=1")
    );
    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("pageSize=10")
    );
  });

  it("throws an error when API call fails", async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(getProperties()).rejects.toThrow("Network error");
  });
});
