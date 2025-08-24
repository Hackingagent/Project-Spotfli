import React from 'react'

const SearchBarComponent = () => {
  return (
    <div className='search-bar-container'>
    <div className="search-bar-nav">
        <input type="text" placeholder='Ask me anything' />
        <i className="fa fa-microphone"></i>
        <i className="fa fa-camera"></i>
        <i className="fa fa-search"></i>
    </div>
    </div>
  )
}

export default SearchBarComponent
