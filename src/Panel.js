import React, { useEffect, useRef, useState } from 'react';
import Toolbar from './Toolbar';
import ComponentProvider from './ComponentProvider';
function Panel({ data = {}, height, width }) {
    const panelRef2 = useRef(null);
    const [state, setState] = useState(data);
    // const [showToolbar, setShow] = useState(false);

    return (
        <div className='x'>
            {ComponentProvider(state, height, width)}
            {/* <Toolbar data={state} stateHandler={setState} /> */}
        </div >
    )
}

export default Panel;
