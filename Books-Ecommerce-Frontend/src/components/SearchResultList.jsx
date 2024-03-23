import React from 'react'
import SearchResult from './SearchResult';

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list bg-gray-100 absolute pl-3 rounded-sm sm:border-2 sm:border-solid  sm:shadow-neutral-500 flex flex-col w-full">
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  )
}

export default SearchResultsList;