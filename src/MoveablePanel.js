import React, { useEffect, useRef, useState } from 'react';
import ComponentProvider from './ComponentProvider';
function MoveablePanel({ properties = {}, data = {}, setActive, id, setElementGuidelines, setAllPanels, allPanels }) {
    const ref = useRef();
    useEffect(() => {
        setAllPanels(x => [...x, ref.current]);
    }, [id])
    const styles = {
        position: "absolute",
        width: `${properties.width}px`,
        height: `${properties.height}px`,
        top: `${properties.top}px`,
        left: `${properties.left}px`,
        transform: `rotate(${properties.rotate}deg)`,
        boxSizing: "border-box",
        cursor: "pointer"
    };
    const makeMeMoveable = () => {
        setActive({ panel: ref.current, id: id });
        setElementGuidelines(x => {
            return allPanels.filter(panel => panel !== ref.current);
        })
    }
    return (
        <>
            <div
                ref={ref}
                style={styles}
                onClick={makeMeMoveable}
            >
                <div className='moveablePanel'
                >
                    {ComponentProvider(data, properties.height, properties.width)}
                </div>
            </div>

            {/* <Moveable
                target={target}
                draggable={true}
                origin={false}
                resizable={true}
                rotatable={true}
                onDrag={({
                    target,
                    beforeDelta,
                    beforeDist,
                    left,
                    top,
                    right,
                    bottom,
                    delta,
                    dist,
                    transform,
                    clientX,
                    clientY
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
                    dist,
                    delta,
                    direction,
                    clientX,
                    clientY,
                    beforeTranslate,
                    drag,
                    e
                }) => {
                    delta[0] && (target.style.width = `${width}px`);
                    delta[1] && (target.style.height = `${height}px`);
                    target.style.left = `${drag.left}px`;
                    target.style.top = `${drag.top}px`;
                    setHeight(height);
                    setWidth(width);
                }}
                onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                    // console.log("onResizeEnd", target, isDrag)
                }}
                onRotate={({ target, delta, dist, transform, clientX, clientY }) => {
                    target.style.transform = transform;
                }}
                onRotateEnd={({ target, isDrag, clientX, clientY }) => {

                }}
            /> */}
        </>
    );
}

export default MoveablePanel;
