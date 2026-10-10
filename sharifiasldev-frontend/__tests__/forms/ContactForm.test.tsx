import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/forms/ContactForm";

// Cloudflare Turnstile loads an external script that never runs under jsdom,
// so the submit button would stay disabled forever. Mock the widget to
// auto-verify a token on mount instead.
jest.mock("@/components/forms/Turnstile", () => {
  const { useEffect } = jest.requireActual("react");
  function MockTurnstile({
    onVerify,
  }: {
    onVerify: (token: string) => void;
  }) {
    useEffect(() => {
      onVerify("test-token");
    }, [onVerify]);
    return null;
  }
  return { __esModule: true, default: MockTurnstile };
});

// We don't mock '@/lib/api' — we mock the global fetch function instead.
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
      expect(mockFetch).toHaveBeenCalled();
    });
    const [url, init] = mockFetch.mock.calls[0] as unknown as [
      string,
      RequestInit & { body: string },
    ];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(init.body)).toEqual({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message.",
      purpose: "consultation",
      source: "contact-page",
      captcha: "test-token",
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
      json: () => Promise.resolve({}),
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
    // ✨ Check for the Persian error message the form renders on failure
    expect(
      await screen.findByText(/بررسی کنید و دوباره تلاش کنید/i)
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
