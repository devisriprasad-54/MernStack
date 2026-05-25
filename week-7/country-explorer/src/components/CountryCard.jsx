const CountryCard = ({ country }) => {
    return (
        <div className="bg-white border border-gray-300 rounded shadow p-4">
            <img
                src={country.flags.svg}
                alt="flag"
                className="w-full h-32 object-cover border-b mb-2"
            />
            <h2 className="text-xl font-bold text-blue-600">{country.name.common}</h2>
            <p><b>Capital:</b> {country.capital ? country.capital[0] : 'None'}</p>
            <p><b>Population:</b> {country.population}</p>
            <p><b>Region:</b> {country.region}</p>
        </div>
    );
};

export default CountryCard;
