import { useState } from "react";
import { Link } from "react-router-dom";
var data = require("./MOCK_DATA.json");



const SearchBar = (props) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        // our api to fetch the search result
        console.log("search ", searchTerm);
    };

    return (
        <div className="">

            <div className=" flex">
                
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-60">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" value={value} onChange={onChange} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search" required></input>
                </div>
                <Link to={"/Service?" + value}><button type="submit" onClick={() => onSearch(value)} class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span class="sr-only">Search</span>
                </button></Link>

            </div>
            <div className="text-center mx-auto">
                {data
                    .filter((item) => {
                        const searchTerm = value.toLowerCase();
                        const fullName = item.full_name.toLowerCase();

                        return (
                            searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm);
                    })
                    .map((item) => (
                        <div onClick={() => onSearch(item.full_name)} className="dropdown-row text-center"
                            key={item.full_name}
                        >
                            {item.full_name}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SearchBar;