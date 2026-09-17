import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import WorkspacePreview from "@/pages/WorkspacePreview";

afterEach(cleanup);
it("preserves original input through review, completion and reset", () => {
  render(<MemoryRouter><WorkspacePreview /></MemoryRouter>);
  const original = "“Trail washed out here. Still passable on the uphill side.”";
  expect(screen.getByText(original)).toBeVisible();
  expect(screen.queryByRole("button", { name: "Simulate verified completion" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Edit note" }));
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Request a qualified trail assessment." } });
  fireEvent.click(screen.getByRole("button", { name: "Save demo note" }));
  expect(screen.getByText(original)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Approve in demo" }));
  fireEvent.click(screen.getByRole("button", { name: "Simulate verified completion" }));
  fireEvent.click(screen.getByRole("button", { name: "Reports" }));
  expect(screen.getByText(/Original: “Trail washed out here/)).toBeVisible();
  expect(screen.getByText(/Reviewer note: Request a qualified/)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Reset demo" }));
  expect(screen.queryByText(/Reviewer note:/)).not.toBeInTheDocument();
  expect(screen.getByText(/0 completed, reviewed outputs/)).toBeVisible();
});
