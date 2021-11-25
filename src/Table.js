import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
function Table({ data, height, width }) {
    // useEffect(() => {
    //     console.log('Table Rendered');
    // })
    const [tableData, setTableData] = useState({ north: 50, south: 30, east: 10, west: 16 });
    const addData = () => {
        setTableData({ ...tableData, ne: 8 });
    }
    const reduxColor = useSelector(state => state.color);
    // console.log(reduxColor);
    const min = Math.min(...Object.values(tableData));
    const TR = styled.tr`background-color:${props => props.color}; border:1px solid #eee`;
    return (
        <div className='inner' style={{ width: `${width}px`, height: `${height}px` }}>
            <table>
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(tableData).map(e => {
                            return (
                                <TR key={e} color={tableData[e] === min ? data.color : '#fff'}>
                                    <td>{e}</td>
                                    <td>{tableData[e]}</td>
                                </TR>
                            )
                        })
                    }
                </tbody>
            </table>
            <button onClick={addData}>Add Data</button>
        </div>
    )
}

export default Table;
