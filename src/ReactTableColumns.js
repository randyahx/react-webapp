import {ReactTableColumnFilter} from "./ReactTableColumnFilter";

export const reacttable_columns = [
    {
        Header: 'Booking Reference',
        accessor: 'booking_id',
        Filter: ReactTableColumnFilter,

    },
    {
        Header: 'Recipient',
        accessor: data => `${data.recipient_firstname} ${data.recipient_lastname}`,
        Filter: ReactTableColumnFilter,
    },
    {
        Header: 'Start Location',
        accessor: 'location_start',
        Filter: ReactTableColumnFilter,
    },
    {
        Header: 'Destination',
        accessor: 'destination',
        Filter: ReactTableColumnFilter,
    },
    {
        Header: 'Transporter',
        accessor: data => `${data.transporter_firstname} ${data.transporter_lastname}`,
        Filter: ReactTableColumnFilter,
    },
    {
        Header: 'Date',
        accessor: 'date',
        Filter: ReactTableColumnFilter,
    },
    {
        Header: 'Status',
        accessor: 'status',
        Filter: ReactTableColumnFilter,
    },
]