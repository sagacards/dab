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
            Header: '',
            accessor: 'thumbnail',
            Cell ({ cell : { value } } : { cell :  { value : string } }) {
                return <img width={50} height={50} src={value.replace('file/d/', 'uc?id=').replace('/view?usp=sharing', '')} />
            }
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Canister ID',
            accessor: 'principal',
            Cell ({ cell : { value } } : { cell :  { value : string } }) {
                return <Hash>{value}</Hash>
            }
        },
        {
            Header: 'Artists',
            accessor: 'artists',
        },
        {
            Header: 'Buy',
            accessor: '',
            Cell (cell : any) {
                return <><a target="_blank" href={`https://bazaar.saga.cards/collection/${cell.row.original.principal}`}>Bazaar</a></>
            },
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