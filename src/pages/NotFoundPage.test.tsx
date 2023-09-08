import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

test("it renders 404 Not Found page correctly", () => {
  render(
    <Router>
      <NotFoundPage />
    </Router>
  );

  expect(screen.getByText("404")).toBeInTheDocument();
  expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  expect(
    screen.getByText(
      "The page you are looking for doesn’t exist or another error occurred."
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Go Home" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Go Home" })).toHaveAttribute(
    "href",
    "/"
  );
});
