export const widgetMap = {
    chart: 'Chart',
    table: 'Table',
}

export const defaultData = {
    [widgetMap.chart]: {
        type: widgetMap.chart,
        size: {
            w: 50,
            h: 20
        },
        panelData: {

        }
    },
    [widgetMap.table]: {
        type: widgetMap.table,
        size: {
            w: 30,
            h: 20
        },
        panelData: {
            // to be imported from Defaults file
        }
    },
}