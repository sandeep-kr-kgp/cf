import React, { useEffect, useRef, useState } from 'react';
import MoveablePanel from './MoveablePanel';
import Moveable from "react-moveable";
function MoveableLayout() {
    const layoutRef = useRef();
    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    });
    const transformLayout = (layout) => {
        let prw = 1 / (window.innerWidth / 1920);
        let prh = 1 / (window.innerHeight / 881);
        let tl = Object.keys(layout).reduce((res, key) => {
            console.log(key)
            return res[key] = {
                ...res, [key]: {
                    ...layout[key],
                    width: layout[key].width / prw,
                    height: layout[key].height / prh,
                    left: layout[key].left / prw,
                    top: layout[key].top / prh,
                }
            }
        }, {});
        console.log(tl);
        return tl;
    }
    const removePX = (x) => {
        return parseFloat(x.slice(0, -2));
    }
    const shadowRef = useRef();
    const [active, setActive] = useState({});
    const [panelIndex, setPanelIndex] = useState(4);
    const [elementGuidelines, setElementGuidelines] = useState([]);
    const [allPanels, setAllPanels] = useState([]);
    const [data, setData] = useState({
        panel2: {
            color: "#50BCB6",
            type: 'Table',
        },
        panel1: {
            color: "#009432",
            type: 'Chart',
        }
    });
    const [layout, setLayout] = useState({
        panel1: {
            width: 1000,
            height: 300,
            top: 100,
            left: 100,
            rotate: 0,
        },
        panel2: {
            width: 1000,
            height: 200,
            top: 500,
            left: 300,
            rotate: 0,
        },

    });
    const [original, setOriginal] = useState({
        panel1: {
            width: 1000,
            height: 300,
            top: 100,
            left: 100,
            rotate: 0,
        },
        panel2: {
            width: 1000,
            height: 300,
            top: 500,
            left: 300,
            rotate: 0,
        },

    });
    console.log(window.innerWidth)
    useEffect(() => {
        let d = localStorage.getItem('data');
        let l = localStorage.getItem('layout');
        let i = localStorage.getItem('lastPanel');
        console.log(d, l);
        if (d && l) {
            setData(JSON.parse(d));
            setLayout(transformLayout(JSON.parse(l)));
            setPanelIndex(parseInt(i));
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('layout', JSON.stringify(original));
        localStorage.setItem('lastPanel', panelIndex);
    }, [data, original, panelIndex]);
    const handleKeyDown = (ev) => {
        ev = ev || window.event;
        var key = ev.which || ev.keyCode;
        var ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17)
            ? true : false);
        if (key === 86 && ctrl) {
            console.log('hm')
            if (!active.id) return;
            copyPanel();
        }
    }
    const copyPanel = () => {
        setData({
            ...data, [`panel${panelIndex}`]: {
                color: data[active.id].color,
                type: data[active.id].type,
                id: `panel${panelIndex}`
            }
        });
        setLayout({
            ...layout, [`panel${panelIndex}`]: {
                width: layout[active.id].width,
                height: layout[active.id].height,
                top: layout[active.id].top + 20,
                left: layout[active.id].left + 50,
                rotate: layout[active.id].rotate,
            }
        });
        setPanelIndex(panelIndex + 1);
    }
    const dragEnter = (e) => {
        e.preventDefault();
    }
    const dragOver = (e) => {
        e.preventDefault();
        shadowRef.current.style.height = '200px';
        shadowRef.current.style.width = '300px';
        shadowRef.current.style.left = `${e.clientX - 450}px`;
        shadowRef.current.style.top = `${e.clientY - 100}px`;
        shadowRef.current.style.display = 'block';
    }
    const handleDrop = (e) => {
        e.preventDefault();
        const dragElementType = e.dataTransfer.getData('text/plain');
        setData({
            ...data, [`panel${panelIndex}`]: {
                color: dragElementType === 'Chart' ? "#833471" : '#9980FA',
                type: dragElementType,
                id: `panel${panelIndex}`
            }
        });
        setLayout({
            ...layout, [`panel${panelIndex}`]: {
                width: 300,
                height: 200,
                top: e.clientY - 100,
                left: e.clientX - 450,
                rotate: 0,
            }
        });
        setOriginal({
            ...original, [`panel${panelIndex}`]: {
                width: 300,
                height: 200,
                top: e.clientY - 100,
                left: e.clientX - 450,
                rotate: 0,
            }
        })
        setPanelIndex(panelIndex + 1);
        shadowRef.current.style.display = 'none';
    }
    const deactivate = (e) => {
        //detect click outside to deactivate moveable rect
        if (e.target !== layoutRef.current) return;
        setActive({});
    }
    // console.log(layout);
    return (
        <>
            <div className='rgl' ref={layoutRef} onDragEnter={dragEnter} onDragOver={dragOver} onDrop={handleDrop} onClick={deactivate}>
                <Moveable
                    snappable={true}
                    elementGuidelines={elementGuidelines}
                    target={active.panel}
                    draggable={true}
                    origin={false}
                    resizable={true}
                    rotatable={true}
                    onDrag={({
                        target,
                        left,
                        top,
                    }) => {
                        target.style.left = `${left}px`;
                        target.style.top = `${top}px`;
                    }}
                    onDragEnd={(e) => {

                    }}
                    onResize={({
                        target,
                        height,
                        width,
                        delta,
                        drag,
                        e
                    }) => {
                        delta[0] && (target.style.width = `${width}px`);
                        delta[1] && (target.style.height = `${height}px`);
                        target.style.left = `${drag.left}px`;
                        target.style.top = `${drag.top}px`;
                        setLayout({
                            ...layout, [active.id]: {
                                width: removePX(target.style.width),
                                height: removePX(target.style.height),
                                top: removePX(target.style.top),
                                left: removePX(target.style.left),
                                rotate: 0,
                            }
                        })
                    }}
                    onResizeEnd={({ target, isDrag, clientX, clientY }) => {

                    }}
                    onRotate={({ target, delta, dist, transform, clientX, clientY }) => {
                        target.style.transform = transform;
                    }}
                    onRotateEnd={({ target, isDrag, clientX, clientY }) => {

                    }}
                />
                <div ref={shadowRef} className='drop-shadow'></div>
                {
                    Object.keys(data).map(e => {
                        return (
                            <div key={e}>
                                <MoveablePanel
                                    setActive={setActive}
                                    data={data[e]}
                                    id={e}
                                    properties={layout[e]}
                                    setElementGuidelines={setElementGuidelines}
                                    setAllPanels={setAllPanels}
                                    allPanels={allPanels}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MoveableLayout;
