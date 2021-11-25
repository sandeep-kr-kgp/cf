import Chart from './Chart';
import Table from './Table';
import { widgetMap } from './Constants';
function ComponentProvider(data, height, width) {
    switch (data.type) {
        case widgetMap.chart:
            return <Chart data={data} height={height} width={width} />
        case widgetMap.table:
            return <Table data={data} height={height} width={width} />
        default:
            return <div>Hello World</div>
    }

}

export default ComponentProvider;
