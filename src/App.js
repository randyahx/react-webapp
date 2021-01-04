import React, {useState} from 'react';
import Search from "./Search";
import ReactTable from "./ReactTable";
import AdminDeliveryView from "./AdminDeliveryView";


export default () => {
    // const [results, setResults] = useState([{}]);
    //
    // const onSearchSubmit = (props) => {
    //     if (!props || props.length===0) {
    //         return;
    //     }
    //     setResults(props);
    //     console.log("results: " + results[0].title);
    // }

    return (
        // <div>
        //     <Search onSearchSubmit={onSearchSubmit}/>
        // </div>
        <ReactTable />
    )
}

