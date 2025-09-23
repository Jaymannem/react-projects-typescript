// Define the structure for City
export interface City {
  name: string;
}

// Define the structure for State, which contains cities
export interface State {
  name: string;
  cities: City[];
}

// Define the structure for Country, which contains states
export interface Country {
  name: string;
  states: State[];
}

// Static data for countries, states, and cities
export const CountryInfo: Country[] = [
  {
    name: "India",
    states: [
      {
        name: "Andhra Pradesh",
        cities: [{ name: "Kadapa" }, { name: "Badvel" }],
      },
      {
        name: "Telangana",
        cities: [{ name: "Hyderabad" }, { name: "Warangal" }],
      },
    ],
  },

  {
    name: "USA",
    states: [
      {
        name: "California",
        cities: [{ name: "Los Angeles" }, { name: "San Francisco" }],
      },
      { name: "Texas", cities: [{ name: "Houston" }, { name: "Dallas" }] },
    ],
  },
];
