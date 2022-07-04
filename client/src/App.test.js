import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./components/Landing/Landing";
import CountryDetail from "./components/CountryDetail/CountryDetail";

test("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


