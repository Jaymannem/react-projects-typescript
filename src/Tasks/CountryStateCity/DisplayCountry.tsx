import { useState, type ChangeEvent } from "react";
import { CountryInfo } from "./Country";

function DisplayCountry() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countryObj = CountryInfo.find(
    (country) => country.name === selectedCountry
  );
  const states = countryObj ? countryObj.states : [];
  const stateObj = states.find((s) => s.name === selectedState);
  const cities = stateObj ? stateObj.cities : [];

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1 data-testid="title">Display Country, State and City</h1>
      <div className="country-info">
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          data-testid="select-country"
        >
          <option>Select Country</option>
          {CountryInfo.map((c) => (
            <option key={c.name} data-testid={`country-option-${c.name}`}>
              {c.name}
            </option>
          ))}
        </select>

        {selectedCountry && (
          <select
            value={selectedState}
            onChange={handleStateChange}
            data-testid="select-state"
          >
            <option>Select State</option>
            {states.map((s) => (
              <option key={s.name} data-testid={`state-option-${s.name}`}>
                {s.name}
              </option>
            ))}
          </select>
        )}

        {selectedState && (
          <select
            value={selectedCity}
            onChange={handleCityChange}
            data-testid="select-city"
          >
            <option>Select City</option>
            {cities.map((city) => (
              <option key={city.name} data-testid={`city-option-${city.name}`}>
                {city.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {selectedCountry && (
        <h3 data-testid="selected-values">
          Selected: {selectedCountry} {selectedState} {selectedCity}
        </h3>
      )}
    </div>
  );
}

export default DisplayCountry;
