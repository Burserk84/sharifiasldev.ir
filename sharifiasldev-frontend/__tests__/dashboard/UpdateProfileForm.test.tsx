import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UpdateProfileForm from "@/components/dashboard/UpdateProfileForm";
import { useSession } from "next-auth/react";

// Mock dependencies
jest.mock("next-auth/react");
const mockFetch = jest.spyOn(global, "fetch");
const mockedUseSession = useSession as jest.Mock;

// A reusable mock session object
const mockSession = {
  data: {
    user: {
      username: "testuser",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
    },
  },
  status: "authenticated",
};

describe("UpdateProfileForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Provide the mock session for every test
    mockedUseSession.mockReturnValue(mockSession);
  });

  it("should render the form pre-filled with user data", () => {
    // Arrange
    render(<UpdateProfileForm />);

    // Assert: Use the correct Persian labels from your component
    expect(screen.getByLabelText(/نام کاربری/i)).toHaveValue("testuser");
    expect(screen.getByLabelText(/^نام$/i)).toHaveValue("Test"); // Use ^ and $ for an exact match on "نام"
    expect(screen.getByLabelText(/نام خانوادگی/i)).toHaveValue("User");
    expect(screen.getByLabelText(/ایمیل/i)).toHaveValue("test@example.com");
  });

  it("should call the API with updated data on successful submission", async () => {
    // Arrange
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({ ok: true } as Response);
    render(<UpdateProfileForm />);

    const usernameInput = screen.getByLabelText(/نام کاربری/i);
    const saveButton = screen.getByRole("button", { name: /ذخیره تغییرات/i });

    // Act
    await user.clear(usernameInput);
    await user.type(usernameInput, "newuser");
    await user.click(saveButton);

    // Assert
    // 1. Check if fetch was called correctly
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "newuser",
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
        }),
      });
    });

    // 2. Check if the Persian success message appeared
    expect(
      await screen.findByText(/پروفایل با موفقیت به‌روزرسانی شد/i)
    ).toBeInTheDocument();
  });
});
