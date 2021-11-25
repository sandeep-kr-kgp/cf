import React, { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { update } from './Redux/actions';
import { useDispatch } from 'react-redux';
function Toolbar({ data, stateHandler }) {
    const dispatch = useDispatch();
    const handleColor = (e) => {
        stateHandler({ ...data, color: e.target.value })
    }
    const dispatchColor = (e) => {
        return dispatch(update(e.target.value));
    }
    const [show, setShow] = useState(false);
    return (
        <div className="toolbar">
            <AiFillSetting className='tool-icon' size={22} onClick={() => setShow(!show)} />
            {
                show
                &&
                <div className='tool-options'>
                    <input value={data.color} onChange={handleColor} type='color' />
                    {/* <input onChange={dispatchColor} type='color' /> */}
                </div>
            }
        </div>
    )
}

export default Toolbar;


// const rotated = true;
// const axisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// option = {
//   xAxis: {
//     type: !rotated?'category':'value',
//     data:!rotated?axisData:[]
//   },
//   yAxis: {
//     type: rotated?'category':'value',
//     data: rotated?axisData:[],
//   },
//   series: [
//     {
//       data: [150, 230, 224, 218, 135, 147, 260],
//       type: 'line'
//     }
//   ]
// };