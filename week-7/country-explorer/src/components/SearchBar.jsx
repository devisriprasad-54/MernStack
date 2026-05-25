import { useRef, useEffect, useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        // Autofocus on load
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        // This sends the search to the App only when clicking the button
        onSearch(inputValue);
    };

    // Bonus: Handle Enter key so they don't HAVE to click every time
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(inputValue);
        }
    };

    return (
        <div className="mb-5 text-center flex justify-center items-center gap-2">
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                className="border-2 border-gray-400 p-2 rounded-lg w-1/2"
                placeholder="Search for a country..."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSearchClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
