import React from 'react'

const SearchResults = ({ data }) => {
  return (
    <div className='search'>
      {!data.length ? (
        <h1>No Pets Found</h1>
      ) : (
        data.map(item => {
          return (
            <p
              id={item.id}
            >
              {item.name}
            </p>
          )
        })
      )}
    </div>
  )
}

export default SearchResults
