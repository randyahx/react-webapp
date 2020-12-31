import React from "react";

export const ReactTableColumnFilter = ({column}) => {
    const {filter, setFilter} = column;

    return (<div>
        <span>
            <input value={filter} onChange={e => setFilter(e.target.value)} />
        </span>
    </div>)
}


