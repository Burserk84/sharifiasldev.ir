import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "@/components/layout/Search";
import { useRouter } from "next/navigation";

// Mock Next.js's router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Search Component", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    // Set up the mock push function before each test
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    jest.clearAllMocks();
  });

  it("should open the modal when the search icon is clicked and close when clicking outside", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Search />);

    // To make this test more robust, it would be best to add an aria-label to your search button
    // e.g., <button aria-label="Open search" ...>
    const searchButton = screen.getByRole("button");

    // Act (Open)
    await user.click(searchButton);

    // Assert (It's open)
    const searchInput = await screen.findByPlaceholderText(/جستجو در سایت.../i);
    expect(searchInput).toBeInTheDocument();

    // Act (Click outside)
    // We can simulate a click on the backdrop by clicking on the document body
    await user.click(document.body);

    // Assert (It's closed)
    // Use waitFor to give the exit animation time to complete
    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText(/جستجو در سایت.../i)
      ).not.toBeInTheDocument();
    });
  });

  it("should call router.push with the query and close the modal on form submission", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Search />);

    // Act
    // 1. Open the modal
    await user.click(screen.getByRole("button"));

    // 2. Type in the search input and press Enter to submit
    const searchInput = await screen.findByPlaceholderText(/جستجو در سایت.../i);
    await user.type(searchInput, "تست برنامه نویسی{enter}");

    // Assert
    // 1. Check if the router was called with the correct URL
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith("/search?q=تست برنامه نویسی");

    // 2. Check if the modal closed after submission
    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText(/جستجو در سایت.../i)
      ).not.toBeInTheDocument();
    });
  });

  it("should NOT call router.push if the query is empty", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Search />);

    // Act
    await user.click(screen.getByRole("button"));
    const searchInput = await screen.findByPlaceholderText(/جستجو در سایت.../i);
    await user.type(searchInput, "   {enter}"); // Submit with only whitespace

    // Assert
    // 1. Check that the router was NOT called
    expect(mockRouterPush).not.toHaveBeenCalled();

    // 2. Check that the modal is still open
    expect(
      screen.getByPlaceholderText(/جستجو در سایت.../i)
    ).toBeInTheDocument();
  });
});
