

const FilterCard = ({ category, status,search , onCategoryChange, onStatusChange ,onSearchChange }) => {
    return (
        <div className="filter">
            <label>Category:</label>
            <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value=''>All categories</option>
                {['electronic', 'furniture', 'automotive', 'other'].map(
                    (category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    )
                )}
            </select>

            <label>Status:</label>
            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value=''>All statuses</option>
                {['new', 'used'].map(
                    (status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    )
                )}
            </select>
            <label>Search:</label>
            <input
                type='text'
                placeholder="eg. sofa..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
}

export default FilterCard
