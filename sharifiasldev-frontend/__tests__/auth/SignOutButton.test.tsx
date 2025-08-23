import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignOutButton from "@/components/auth/SignOutButton"; // Adjust path
import { signOut } from "next-auth/react";

// Mock the next-auth/react library
jest.mock("next-auth/react", () => ({
  // We only need to mock the signOut function for this component
  signOut: jest.fn(),
}));

describe("SignOutButton", () => {
  it("should call signOut when clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const mockSignOut = signOut as jest.Mock; // Get our mock function

    render(<SignOutButton />);

    // Act
    const button = screen.getByRole("button", { name: /خروج از حساب کاربری/i });
    await user.click(button);

    // Assert
    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: "/" }); // Check if it was called with expected options
  });
});
