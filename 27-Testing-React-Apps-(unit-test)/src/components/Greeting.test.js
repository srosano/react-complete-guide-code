import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting Component", () => {
  test("renders Hello World as a text", () => {
    // Arrange (Set up the test data, test conditions and test e)
    render(<Greeting />);
    // Act (Run logic that should be tested eg. execute function)
    // ..nothing

    // Assert (Compare execution results with expected results)
    const helloWorldElement = screen.getByText("Hello World!");

    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders good to see you was NOT clicked", () => {
    render(<Greeting />);

    const outputElement = screen.getByText("good to see you", { exact: false });

    expect(outputElement).toBeInTheDocument();
  });

  test("Render 'Changed!' if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();

  });

  test("does NOT render 'good to see you' if the button was clicked", ()=>{
        // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText("good to see you", { exact: false });
    expect(outputElement).toBeNull();
  });
});
