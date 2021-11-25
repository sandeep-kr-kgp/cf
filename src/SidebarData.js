import { AiOutlineBarChart, AiOutlineTable, AiFillGolden } from 'react-icons/ai';
import { widgetMap } from './Constants';
export const SidebarData = [
    {
        title: widgetMap.chart,
        icon: <AiOutlineBarChart className="sidebar-element-icon" size={75} color="#dfe6e9" />
    },
    {
        title: widgetMap.table,
        icon: <AiOutlineTable className="sidebar-element-icon" size={75} color="#dfe6e9" />
    }
]