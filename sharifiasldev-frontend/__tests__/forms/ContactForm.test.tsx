import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/forms/ContactForm"; // Adjust path if needed

// ✨ We don't need to mock '@/lib/api' anymore.
// We mock the global fetch function instead.
const mockFetch = jest.spyOn(global, "fetch");

describe("ContactForm", () => {
  // Clear mock history before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should submit the form with correct data and show a success message", async () => {
    // Arrange
    const user = userEvent.setup();
    // ✨ Tell our mock fetch to simulate a successful response
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

    render(<ContactForm />);

    // Act
    // ✨ Use the correct Persian placeholder text to find the inputs
    await user.type(screen.getByPlaceholderText(/نام شما/i), "Test User");
    await user.type(screen.getByPlaceholderText(/ایمیل/i), "test@example.com");
    await user.type(
      screen.getByPlaceholderText(/پیغام شما/i),
      "This is a test message."
    );

    // ✨ Use the correct Persian button text
    await user.click(screen.getByRole("button", { name: /ارسال پیام/i }));

    // Assert
    // 1. Was fetch called with the right data?
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          message: "This is a test message.",
        }),
      });
    });

    // 2. Did the Persian success message appear?
    expect(
      await screen.findByText(/پیام شما با موفقیت ارسال شد/i)
    ).toBeInTheDocument();
  });

  it("should show an error message if the submission fails", async () => {
    // Arrange
    const user = userEvent.setup();
    // ✨ Tell our mock fetch to simulate a failed API call
    mockFetch.mockResolvedValue({
      ok: false,
    } as Response);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<ContactForm />);

    // Act
    await user.type(screen.getByPlaceholderText(/نام شما/i), "Test User");
    await user.type(screen.getByPlaceholderText(/ایمیل/i), "test@example.com");
    await user.type(
      screen.getByPlaceholderText(/پیغام شما/i),
      "This is a test message."
    );

    await user.click(screen.getByRole("button", { name: /ارسال پیام/i }));

    // Assert
    // ✨ Check for the Persian error message
    expect(
      await screen.findByText(/خطایی رخ داد. لطفاً دوباره تلاش کنید/i)
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
