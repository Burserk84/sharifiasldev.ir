import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";
import { signOut } from "next-auth/react";

// Mock dependencies
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));
const mockFetch = jest.spyOn(global, "fetch");
const mockedSignOut = signOut as jest.Mock;

describe("ChangePasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✨ Use fake timers for tests that involve setTimeout
  it("should show a validation error if new passwords do not match", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ChangePasswordForm />);

    // Act
    await user.type(
      screen.getByPlaceholderText(/رمز عبور فعلی/i),
      "oldPassword123"
    );
    await user.type(
      screen.getByPlaceholderText(/^رمز عبور جدید$/i),
      "newPassword123"
    );
    await user.type(
      screen.getByPlaceholderText(/تکرار رمز عبور جدید/i),
      "newPasswordDoesNotMatch"
    );
    await user.click(screen.getByRole("button", { name: /تغییر رمز عبور/i }));

    // Assert
    expect(
      await screen.findByText(/رمز عبور جدید با تکرار آن مطابقت ندارد/i)
    ).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should call fetch and then signOut on successful submission", async () => {
    // ✨ THE FIX: This is the correct way to handle fake timers and user-event
    // 1. Enable fake timers
    jest.useFakeTimers();
    // 2. Configure userEvent to work with the fake timers
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Arrange
    mockFetch.mockResolvedValue({ ok: true } as Response);
    render(<ChangePasswordForm />);

    // Act
    await user.type(
      screen.getByPlaceholderText(/رمز عبور فعلی/i),
      "oldPassword123"
    );
    await user.type(
      screen.getByPlaceholderText(/^رمز عبور جدید$/i),
      "newPassword123!"
    );
    await user.type(
      screen.getByPlaceholderText(/تکرار رمز عبور جدید/i),
      "newPassword123!"
    );
    await user.click(screen.getByRole("button", { name: /تغییر رمز عبور/i }));

    // Assert
    expect(
      await screen.findByText(/رمز عبور با موفقیت تغییر کرد/i)
    ).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/auth/change-password",
      expect.any(Object)
    );

    // 3. Manually advance the timers by 3000ms to run the setTimeout
    jest.advanceTimersByTime(3000);

    expect(mockedSignOut).toHaveBeenCalledWith({ callbackUrl: "/login" });

    // 4. Restore real timers
    jest.useRealTimers();
  });

  it("should show an error message if the API call fails", async () => {
    // Arrange
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "رمز عبور فعلی نامعتبر است" }),
    } as Response);

    render(<ChangePasswordForm />);

    // Act
    await user.type(screen.getByPlaceholderText(/رمز عبور فعلی/i), "oldPass");
    await user.type(
      screen.getByPlaceholderText(/^رمز عبور جدید$/i),
      "newPass123"
    );
    await user.type(
      screen.getByPlaceholderText(/تکرار رمز عبور جدید/i),
      "newPass123"
    );
    await user.click(screen.getByRole("button", { name: /تغییر رمز عبور/i }));

    // Assert
    expect(
      await screen.findByText(/رمز عبور فعلی نامعتبر است/i)
    ).toBeInTheDocument();
  });
});
