import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ImpactPage from "../Home/impact";
import ListOperatorsPage from "./ListOperatorsPage";
import { ModalProvider } from "../../Contexts/ModalContext";
import Dashboard from "../Router/Dashboard";
import { AuthProvider } from "../../Contexts/AuthContext";
import ListLocatiosPage from "./ListLocationsPage";
import ListProductsPage from "./ListProductsPage";
import AddGeography from "../GeographicalCropManagement/AddGeography";
import AddVillage from "../GeographicalCropManagement/AddVillage";
import AddGrowingCrops from "../GeographicalCropManagement/AddGrowingCrops";
import AddDryingCrops from "../GeographicalCropManagement/AddDryingCrops";
import MainConfiguration from "../SetupManagement/MainConfiguration";

describe("Dashboard component", () => {
  test("renders Dashboard", async () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );

    // Wait for the component to finish rendering
    await waitFor(() => {
      // Assert that the component is rendered
      const dashboardElement = screen.getByTestId("dashboard");
      expect(dashboardElement).toBeInTheDocument();

      // Additional assertion example
    });
  });
});
describe("ImpactPage component", () => {
  test("renders ImpactPage", () => {
    render(<ImpactPage />);

    // Assert that the component is rendered
    const impactPageElement = screen.getByTestId("impact-page");
    expect(impactPageElement).toBeInTheDocument();

    // Additional assertion example
    const titleElement = screen.getByText("Pequrel Impact");
    expect(titleElement).toBeInTheDocument();
  });
});
describe("ListOperators component", () => {
  test("renders ListOperatorsPage", async () => {
    render(
      <ModalProvider>
        <ListOperatorsPage />
      </ModalProvider>
    );

    // Wait for the component to finish rendering
    await waitFor(() => {
      // Assert that the component is rendered
      const ListOperatorsPageElement = screen.getByTestId("list-operators");
      expect(ListOperatorsPageElement).toBeInTheDocument();

      // Additional assertion example
      const tableHeadElement = screen.getByText("Full Name");
      expect(tableHeadElement).toBeInTheDocument();
    });
  });
});
describe("ListLocations component", () => {
  test("renders ListlocationsPage", async () => {
    render(
      <ModalProvider>
        <ListLocatiosPage />
      </ModalProvider>
    );

    // Wait for the component to finish rendering
    await waitFor(() => {
      // Assert that the component is rendered
      const ListOperatorsPageElement = screen.getByTestId("list-locations");
      expect(ListOperatorsPageElement).toBeInTheDocument();

      // Additional assertion example
      const tableHeadElement = screen.getByText("Full Name");
      expect(tableHeadElement).toBeInTheDocument();
    });
  });
});
describe("ListProducts component", () => {
  test("renders ListProductsPage", async () => {
    render(
      <ModalProvider>
        <ListProductsPage />
      </ModalProvider>
    );

    // Wait for the component to finish rendering
    await waitFor(() => {
      // Assert that the component is rendered
      const ListOperatorsPageElement = screen.getByTestId("list-products");
      expect(ListOperatorsPageElement).toBeInTheDocument();

      // Additional assertion example
    });
  });
});

describe("AddGeography component", () => {
  test("renders Add new geography button", () => {
    render(<AddGeography />);

    const addButton = screen.getByTestId("add-geography");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add new geography");
  });

  test("enables form input and handles submit", () => {
    render(<AddGeography />);

    const addButton = screen.getByTestId("add-geography");
    fireEvent.click(addButton);

    const inputField = screen.getByLabelText("Geography");
    const submitButton = screen.getByText("Submit");

    expect(inputField).toBeEnabled();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: "Region 1" } });
    fireEvent.click(submitButton);

    // Add your assertions for success state here
  });
});

describe("AddVillage component", () => {
  beforeEach(() => {
    render(<AddVillage />);
  });

  test("renders 'Add new village' button initially", () => {
    const addButton = screen.getByTestId("add-village");
    expect(addButton).toBeInTheDocument();
  });

  test("clicking 'Add new village' button enables the form", async () => {
    const addButton = screen.getByTestId("add-village");
    fireEvent.click(addButton);
  });
});
