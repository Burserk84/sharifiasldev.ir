import { render, fireEvent, screen } from "@testing-library/react";
import React, { useRef } from "react";
import { useOnClickOutside } from "@/components/hooks/useOnClickOutside"; // Adjust path if needed

// A dummy component to test the hook
const TestComponent = ({ handler }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handler);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Click Inside Me
      </div>
      <div data-testid="outside">Click Outside Me</div>
    </div>
  );
};

describe("useOnClickOutside Hook", () => {
  it("should call the handler when clicking outside the element", () => {
    // Arrange
    const mockHandler = jest.fn(); // Create a mock function
    render(<TestComponent handler={mockHandler} />);

    // Act
    // fireEvent is simpler here than userEvent for a generic document click
    fireEvent.mouseDown(screen.getByTestId("outside"));

    // Assert
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it("should not call the handler when clicking inside the element", () => {
    // Arrange
    const mockHandler = jest.fn();
    render(<TestComponent handler={mockHandler} />);

    // Act
    fireEvent.mouseDown(screen.getByTestId("inside"));

    // Assert
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
