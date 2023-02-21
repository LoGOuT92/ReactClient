import { render, screen } from "@testing-library/react";
import { Diagram } from "./Diagram";

describe("Diagram", () => {
  it("rendering the diagram after entering the data", () => {
    const data = [
      { id: 1, title: "Facebook", value: 10, color: "#FF0000" },
      { id: 2, title: "Instagram", value: 20, color: "#00FF00" },
      { id: 3, title: "Twitter", value: 30, color: "#0000FF" },
    ];

    render(<Diagram data={data} />);
    const title1 = screen.getByText("Facebook");
    expect(title1).toBeInTheDocument();

    const title2 = screen.getByText("Instagram");
    expect(title2).toBeInTheDocument();

    const title3 = screen.getByText("Twitter");
    expect(title3).toBeInTheDocument();
  });
});
