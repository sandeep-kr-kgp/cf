import React, { useState } from 'react';
import { SidebarData } from './SidebarData';
// import chartLogo from './Chart.png';
function Sidebar() {
    const changeMyImage = (e, title) => {
        e.dataTransfer.setData("text/plain", `${title}`);
        // var image = new Image();
        // image.src = chartLogo;
        // e.dataTransfer.setDragImage(image, 150, 100);
    }
    return (
        <div className='sidebar'>
            {
                SidebarData.map(e => {
                    return (
                        <div key={e.title}
                            className='sidebar-element droppable-element'
                            draggable={true}
                            unselectable="on"
                            onDragStart={(ev) => changeMyImage(ev, e.title)}
                        >
                            {e.icon}
                            <span className='sidebar-element-title'>{e.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar;
