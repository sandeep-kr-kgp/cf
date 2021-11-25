import React, { useState, useRef } from 'react';
import Panel from './Panel';
import GridLayout from 'react-grid-layout';
import { defaultData } from './Constants';
function Layout({ dataFromDB = {} }) {

    const layoutRef = useRef();
    const bottomRef = useRef();
    const topRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();
    const [current, setCurrent] = useState('');
    const layoutChanged = (layout) => {
        setCurrent(layout.reduce((acc, curr) => acc + `ID: ${curr.i} x:${curr.x}, y:${curr.y}, w:${curr.w}, h:${curr.h} `, ''));
    }
    // const[layout, setLayout]=useState({});
    const [panelIndex, setPanelIndex] = useState(3);
    const [data, setData] = useState(
        {
            panel1: {
                color: "#fce94f",
                type: 'Chart',
                id: 'panel1'
            },
            panel2: {
                color: "#50BCB6",
                type: 'Table',
                id: 'panel2'
            }
        }
    )
    const [layout, setLayout] = useState([
        {
            i: 'panel1',
            x: 50,
            y: 3,
            w: 40,
            h: 30,
            isResizable: true,
            resizeHandles: ['se'],
            isDraggable: true
        },
        {
            i: 'panel2',
            x: 30,
            y: 40,
            w: 30,
            h: 20,
            isResizable: true,
            resizeHandles: ['se'],
            isDraggable: true,
        }
    ])
    const handleDrop = (layout, item, event) => {
        let dragElementType = event.dataTransfer.getData('text/plain');
        console.log(dragElementType);
        setData({
            ...data, [`panel${panelIndex}`]: {
                color: dragElementType === 'Chart' ? "#b2bec3" : "#3498db",
                type: dragElementType,
                id: `panel${panelIndex}`
            }
        });
        setLayout(layout);
        setPanelIndex(panelIndex + 1);
        dragStop();
    }
    const dragOver = (event) => {
        let dragElementType = event.dataTransfer.getData('text/plain');
        return {
            w: defaultData[dragElementType].size.w,
            h: defaultData[dragElementType].size.h
        }
    }
    const dragStart = (layout, oldItem, newItem, placeholder, event, element) => {
        // console.log(element.style);
        bottomRef.current.style.display = 'block';
        topRef.current.style.display = 'block';
        leftRef.current.style.display = 'block';
        rightRef.current.style.display = 'block';
        topRef.current.style.top = `calc(${element.style.top} + 21px)`;
        bottomRef.current.style.top = `calc(${element.style.top} + ${element.style.height} + 23px)`;
        leftRef.current.style.left = `calc(${element.style.left} + 300px)`;
        rightRef.current.style.left = `calc(${element.style.left} + 300px + ${element.style.width})`;
    }
    const dragStop = (layout, oldItem, newItem, placeholder, event, element) => {
        bottomRef.current.style.display = 'none';
        topRef.current.style.display = 'none';
        leftRef.current.style.display = 'none';
        rightRef.current.style.display = 'none';
    }
    return (
        <>
            <div className='rgl'>
                <code>current layout:{current}</code>
                <hr ref={bottomRef} className='bottom' />
                <hr ref={topRef} className='top' />
                <hr ref={leftRef} className='left' />
                <hr ref={rightRef} className='right' />
                <GridLayout
                    ref={layoutRef}
                    layout={layout}
                    cols={200}
                    rowHeight={2}
                    width={window.innerWidth}
                    compactType={null}
                    preventCollision={true}
                    onLayoutChange={layoutChanged}
                    isResizable={true}
                    resizeHandles={['se']}
                    allowOverlap={false}
                    useCSSTransforms={false}
                    measureBeforeMount={false}
                    isDroppable={true}
                    droppingItem={{
                        w: 10, h: 10, i: `panel${panelIndex}`, isResizable: true,
                        resizeHandles: ['se'],
                        isDraggable: true,
                    }}
                    onDropDragOver={dragOver}
                    onDrop={handleDrop}
                    onDrag={dragStart}
                    onDragStop={dragStop}
                >
                    {
                        Object.keys(data).map(e => {
                            return (
                                <div className="component" key={data[e].id}>
                                    <Panel data={data[e]} />
                                </div>
                            )
                        })
                    }
                </GridLayout>
            </div>
        </>
    )
}

export default Layout;
