import { useState } from "react"
import "./SearchBar.css"

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search tasks by title, description or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn-search">
          Search
        </button>
        {searchTerm && (
          <button type="button" className="btn-clear" onClick={handleClear}>
            Clear
          </button>
        )}
      </form>
    </div>
  )
}

export default SearchBar
