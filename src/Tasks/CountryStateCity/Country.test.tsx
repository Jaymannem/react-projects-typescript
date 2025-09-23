import DisplayCountry from "./DisplayCountry";
import { fireEvent, render, screen } from "@testing-library/react";
import { CountryInfo } from "./Country";

describe("Display Country", () => {
  test("TC01: Rendering component", () => {
    render(<DisplayCountry />);
    const title = screen.getByTestId("title");
    const countryDropdown = screen.getByTestId("select-country");
    expect(title).toBeInTheDocument();
    expect(countryDropdown).toBeInTheDocument();
  });

  test("TC02: Intially State and City dropdowns hidden", () => {
    render(<DisplayCountry />);
    expect(screen.queryByTestId("select-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("select-city")).not.toBeInTheDocument();
  });

  test("TC03: Renders all options for country drodpown", () => {
    render(<DisplayCountry />);
    CountryInfo.forEach((country) => {
      expect(
        screen.getByTestId(`country-option-${country.name}`)
      ).toBeInTheDocument();
    });
  });

  test("TC04: Display State drodpown when country option click", () => {
    render(<DisplayCountry />);
    const countryDropdown = screen.getByTestId("select-country");
    fireEvent.change(countryDropdown, { target: { value: "India" } });
    expect(screen.getByTestId("select-state")).toBeInTheDocument();
  });

  test("TC05: Selecting a state shows city dropdown", () => {
    render(<DisplayCountry />);
    const countryDropdown = screen.getByTestId("select-country");
    fireEvent.change(countryDropdown, { target: { value: "India" } });
    const stateDropdown = screen.getByTestId("select-state");
    fireEvent.change(stateDropdown, { target: { value: "Andhra Pradesh" } });
    expect(screen.getByTestId("select-city")).toBeInTheDocument();
  });

  test("TC06: Shows Selected options", () => {
    render(<DisplayCountry />);
    const countryDropdown = screen.getByTestId("select-country");
    fireEvent.change(countryDropdown, { target: { value: "India" } });
    const stateDropdown = screen.getByTestId("select-state");
    expect(stateDropdown).toBeInTheDocument();

    fireEvent.change(stateDropdown, { target: { value: "Andhra Pradesh" } });
    const cityDropdown = screen.getByTestId("select-city");
    expect(cityDropdown).toBeInTheDocument();

    fireEvent.change(cityDropdown, { target: { value: "Kadapa" } });
    expect(screen.getByTestId("selected-values")).toHaveTextContent(
      "Selected: India Andhra Pradesh Kadapa"
    );
  });
});
