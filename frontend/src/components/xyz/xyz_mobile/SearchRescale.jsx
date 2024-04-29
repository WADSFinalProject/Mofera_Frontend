import { useState, useEffect } from 'react'  
import '../../../style/xyz/xyz_mobile/FindRescalePackage.css';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchResult from './SearchResult';
import jsonData from '../../../../data.json';

function SearchRescale() {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        // Set initial search result to full jsonData when component mounts
        setSearchResult(jsonData);
    }, []);

    function handleSearch(e) {
        setInput(e);
        if (e) {
            const filteredData = jsonData.filter(item => item.packageID && item.packageID.toString().includes(e));
            setSearchResult(filteredData);
        } else {
            setSearchResult(jsonData);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-center flex-col relative">
                <div>
                    <p className='text-3xl secondary font-bold mb-1 mt-5'>Rescaling</p>
                    <p className='secondary mb-1'>Find Package ID to rescale</p>
                </div>
                <div className='w-10 h-10 rounded-full bg-gray-400 absolute right-5'>
                    <img src="" alt="" />
                </div>
            </div>
            <div className='search relative py-4'>
                <input type="search" placeholder='Search Package ID...' value={input} onChange={(e) => handleSearch(e.target.value)}/>
                <button className='absolute right-8 top-1/2 p-3 rounded-full -translate-y-1/2 text-white'>
                    <AiOutlineSearch/>
                </button>
            </div>
            <SearchResult searchResult={searchResult} />
        </div>
        
    )
}

export default SearchRescale;
