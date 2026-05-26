# Assignment 7: React Frontend Applications

This directory contains frontend projects built with React and Vite. It covers state management, hook integration, component lifecycles, and styled UI presentation.

---

## Detailed Frontend Architecture

### 1. Country Explorer App (`/country-explorer`)
A React application that queries and filters country statistics using a public REST API.

*   #### Main Application (`src/App.jsx`)
    *   **Local States**:
        *   `countries` (Array, defaults to `[]`): Stores the raw list of country objects fetched from the API.
        *   `loading` (Boolean, defaults to `true`): Manages the loading screen toggle.
        *   `error` (String/Null, defaults to `null`): Stores error strings on fetch failure.
        *   `query` (String, defaults to `""`): Manages the active search string inputted by the user.
    *   **Lifecycle Hook (`useEffect`)**:
        On component mount, triggers an asynchronous fetch query to the RestCountries API:
        `https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,region,cca3`
        Parses results as JSON and updates state. Handles loading switches and exception catching.
    *   **Filtering Logic**:
        Filters countries dynamically prior to rendering by checking if the common name matches the query string:
        `countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))`

*   #### Search Bar Component (`src/components/SearchBar.jsx`)
    *   **Props**: `onSearch` (Callback function triggering query update in `App.jsx`).
    *   **State**: `inputValue` (Local state managing input text).
    *   **DOM Reference (`useRef`)**:
        `inputRef = useRef(null)` binds directly to the `<input>` element.
        `useEffect` executes on load to auto-focus the field via `inputRef.current.focus()`.
    *   **Interaction Logic**:
        *   `onChange` triggers `setInputValue` updating input state on keypress.
        *   `onKeyDown` detects if the user presses `Enter`, automatically triggering `onSearch(inputValue)`.
        *   A styled search button triggers `onSearch(inputValue)` when clicked.

*   #### Country List Component (`src/components/CountryList.jsx`)
    *   **Props**: `countries` (Filtered array of country objects).
    *   **Logic**: Returns `<p className="text-red-500 font-bold">No countries found!</p>` if the input array is empty. Otherwise, renders a container grid mapping through items to render `<CountryCard>`.

*   #### Country Card Component (`src/components/CountryCard.jsx`)
    *   **Props**: `country` (Individual country object).
    *   **UI layout**: Renders a card container (`bg-white rounded p-4 shadow`) containing the SVG flag image, common name (`country.name.common`), capital city (`country.capital[0]`), population, and region.
    *   deployment link => https://vercel.com/devirsriprasad/country-explorer/2JqzXiN34qPXvKbHdiMbxz57yhhr

---

### 2. Products Catalog App (`/products-page-app`)
A React application rendering a product listing page using static mock data and Tailwind CSS grid layouts.

*   #### Main Entry App (`src/App.jsx`)
    Imports and returns `<Products />` wrapped inside index structures.

*   #### Products Grid Component (`src/components/Products.jsx`)
    *   **Data**: An array of 10 static product objects, each containing:
        `productId`, `name`, `price`, `brand`, `description`, and a placeholder seeds image URL (`https://picsum.photos/...`).
    *   **UI layout**: Wraps the page in a light blue background (`bg-blue-300`). Maps the product array into a responsive Tailwind grid layout:
        `<div className="grid grid-cols-5 m-5 gap-5 w-auto">`
        Each product index maps to a `<Product>` child component.

*   #### Product Card Component (`src/components/Product.jsx`)
    *   **Props**: `product` (Object containing individual item details).
    *   **UI layout**: Renders details inside a pink box (`bg-pink-50 w-65 p-5 text-center`):
        Includes product image, name header (`<h3>`), brand subheader (`<h5>`), description paragraph, and price.
    deployment link => https://vercel.com/devirsriprasad/products-page-app/FMo1Tc6SWCoAFHTVCkq4xxCnzbaP
