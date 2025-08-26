// __tests__/dashboard/PurchasedProducts.test.tsx

import { render, screen } from "@testing-library/react";
import PurchasedProducts from "@/components/dashboard/PurchasedProducts";

// ✨ FIX: Define the environment variable needed by the component
process.env.NEXT_PUBLIC_STRAPI_URL = "process.env.NEXT_PUBLIC_STRAPI_URL";

const mockFetch = jest.spyOn(global, "fetch");

// Mock data that matches your component's expected structure
const mockOrders = [
  {
    id: 1,
    attributes: {
      orderId: "ORDER-123",
      status: "Completed",
      products: {
        data: [
          {
            id: 101,
            attributes: {
              name: "My Awesome Theme",
              productImage: { data: [{ attributes: { url: "/image.jpg" } }] },
              downloadableFile: {
                data: { attributes: { url: "/download.zip" } },
              },
            },
          },
        ],
      },
    },
  },
];

describe("PurchasedProducts", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should show loading state initially", () => {
    render(<PurchasedProducts />);
    expect(screen.getByText(/در حال بارگذاری سفارشات/i)).toBeInTheDocument();
  });

  it("should render a list of products on successful fetch", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockOrders),
    } as Response);

    render(<PurchasedProducts />);

    expect(await screen.findByText("My Awesome Theme")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /دانلود/i })).toBeInTheDocument();
  });

  it("should render an empty state message when no products are fetched", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    } as Response);

    render(<PurchasedProducts />);

    expect(
      await screen.findByText(/شما هنوز هیچ محصولی خریداری نکرده‌اید/i)
    ).toBeInTheDocument();
  });
});
