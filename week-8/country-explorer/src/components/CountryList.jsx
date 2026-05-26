import CountryCard from './CountryCard';

const CountryList = ({ countries }) => {
    if (countries.length === 0) {
        return <p className="text-red-500 font-bold">No countries found!</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {countries.map((c) => (
                <CountryCard key={c.cca3} country={c} />
            ))}
        </div>
    );
};

export default CountryList;
