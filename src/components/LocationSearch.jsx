import { section, ul } from 'framer-motion/client';
import {useState, useEffect, useRef} from 'react';

export default function LocationSearch({ onCitySelect}) {
  
  // Track what user is typing ~ string
  const [searchTerm, setSearchTerm] = useState('');

  // List of suggested cities from GeoDB ~ array of results
  const [suggestions, setSuggestions] = useState([]);

  // Optional - prevents too many API calls at once
  const [isLoading, setIsLoading] = useState(false);

  // Ref to help debounce the fetch results
  const debounceTimeout = useRef(null);

  useEffect(() => {
    // Don't run API call if the seach term it too short (only 1 letter)
    if (searchTerm.length < 2){
      setSuggestions([]);
      return;
    }

    // Debounce: wait 500ms after user stops typing before making API call
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 500);

    // Cleanup timout of the component re-renders quickly
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  // Function to get suggestions from GeoDB Cities API
  const fetchSuggestions = async (query) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&sort=-population`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '9bc503789fmshacd3aa7a8189610p1be7ccjsn1d4783c68315', // replace with your real key
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          },
        }
      );

      const data = await response.json();

      // Save the results for dropdown display
      setSuggestions(data.data || []);
    } catch (error) {
      console.error('GeoDB API error:', error);
    }

    setIsLoading(false);
  };

  // When a user selects a city from the list
  const handleCitySelect = (city) => {
    setSearchTerm(`${city.name}, ${city.region}, ${city.country}`); // fill input
    setSuggestions([]); //hide dropdown

    // Call parent function with selected city's coordinates
    onCitySelect({
      name: city.name,
      region: city.region,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude,
      countryCode: city.countryCode,
    });
  };
  

  return(
    <section className='search-bar'>
      {/* Input box for city name */}
      <input 
        type="text"
        placeholder='Search for a city...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dropdown list that shows suggestions */}
      {suggestions.length > 0 && (
        <ul className='suggestions-dropdown'>
          {suggestions.map((city, index) => (
            <li
              key = {index}
              onClick={() => handleCitySelect(city)}
            >
              {city.name}, {city.region}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}