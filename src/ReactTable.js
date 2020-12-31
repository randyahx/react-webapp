import React, {useMemo} from 'react';
import {useTable, useSortBy, useFilters, usePagination} from 'react-table';
import {reacttable_columns} from "./ReactTableColumns";
import {ReactTableFilter} from "./ReactTableFilter";
import db from './db.json'
import Search from "./Search";

const ReactTable = ({response}) => {
    // 1. Convert columns and data so they don't reload on render
    const columns = useMemo(() => reacttable_columns, []);
    const data = useMemo(() => response, []);

    console.log(data);

    // 2. Create table instance using column and data
    const tableInstance = useTable({
        columns: columns,
        data: data,
    }, useFilters, useSortBy, usePagination);

    // 3. Extract methods from table instance
    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, prepareRow, state, setGlobalFilter } = tableInstance;

    const {globalFilter, pageIndex} = state;

    // const renderPaginationRow = headerGroups => {
    //     return (
    //         <tr>
    //             <span>Page {pageIndex+1} of {pageOptions.length}</span>
    //             <button onClick={() => previousPage()} disabled={!canPreviousPage}>
    //                 <i className='arrow left icon'/>
    //             </button>
    //             <button onClick={() => nextPage()} disabled={!canNextPage}>
    //                 <i className='arrow right icon'/>
    //             </button>
    //         </tr>
    //     )
    // }

    const renderHeader = headerGroups.map(headerGroup => {
        return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => {
                            return (
                                    <th>
                                        {column.render('Header')}
                                        <span {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <i className={column.isSorted ? (column.isSortedDesc ? 'sort amount up icon' : 'sort amount down icon') : 'sort icon'}/>
                                        </span>
                                        {/*Remove if global filter*/}
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    </th>
                            )
                    })}
                </tr>
        )});

    const renderBody = page.map(row => {
        prepareRow(row)
        return (
            <tr {...row.getRowProps}>
                {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
            </tr>
        )})

    return (
        <React.Fragment>
            <div>
                <Search/>
            </div>
            {/*<ReactTableFilter filter={globalFilter} setFilter={setGlobalFilter} />*/}
            <table {...getTableProps()} className='ui basic table'>
                <thead>
                <tr>
                    <span>Page {pageIndex+1} of {pageOptions.length}</span>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className='arrow left icon'/>
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <i className='arrow right icon'/>
                    </button>
                </tr>
                {renderHeader}
                </thead>
                <tbody {...getTableBodyProps}>
                {renderBody}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ReactTable;