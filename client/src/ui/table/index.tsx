import React from 'react'
import { useTable } from 'react-table';
import { useTarotDAB } from 'api/tarot-dab';
import Styles from './styles.module.css'
import Hash from 'ui/hash';

interface Props {
    children?: React.ReactNode;
}

export default function Table (props : Props) {
    const { data } = useTarotDAB();
    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Canister ID',
            accessor: 'principal_id',
            Cell ({ cell : { value } } : { cell :  { value : string } }) {
                return <Hash>{value}</Hash>
            }
        },
        {
            Header: 'Artists',
            accessor: '',
            Cell: '-',
        },
        {
            Header: 'Homepage',
            accessor: '',
            Cell: '-',
        },
        {
            Header: 'Buy',
            accessor: '',
            Cell: <><a target="_blank" href="https://bazaar.saga.cards">Bazaar</a></>,
        },
    ], []);
    const {
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        // @ts-ignore: react-table types are garb
        columns, data: data || []
    });
    return <table className={Styles.root}>
        <thead>
            {headerGroups.map(row => <tr>
                {row.headers.map(col => <th>{col.render('Header')}</th>)}
            </tr>)}
        </thead>
        <tbody>
            {rows.map(row => {
                // prepareRow is some of the jankiest lib api...
                prepareRow(row)
                return <tr>
                    {row.cells.map(cell => <td>{cell.render('Cell')}</td>)}
                </tr>
            })}
        </tbody>
    </table>
}