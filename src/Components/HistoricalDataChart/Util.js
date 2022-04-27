export const formatHistoricalData = (responseData, dateRange) =>{

    const chartData = [];
    let today = new Date();

    const cpu = {
        datapoints: []
    };

    const memory = {
        datapoints: []
    };

    let mapResponseData = new Map();
    
    for (let index=0; index<responseData.length; index++) {
        mapResponseData.set(new Date(responseData[index].report_date).toDateString() ,responseData[index]);
    }

    for (let index = (dateRange - 1); index >= 0; index--) {
        let dateToCheck = new Date();
        dateToCheck =   new Date(dateToCheck.setDate(today.getDate() - index)).toDateString();
        if (mapResponseData.has(dateToCheck)){
            cpu.datapoints.push({
                name: 'CPU Utilization',
                x: new Date(dateToCheck),
                y: mapResponseData.get(dateToCheck).cpu
            });
                        
            memory.datapoints.push({
                name: 'Memory Utilization',
                x: new Date(dateToCheck),
                y: mapResponseData.get(dateToCheck).memory
            });
        }
        else {
            cpu.datapoints.push({
                name: 'CPU Utilization',
                x: new Date(dateToCheck),
                y: null
            });
        
            memory.datapoints.push({
                name: 'Memory Utilization',
                x: new Date(dateToCheck),
                y: null
            });
        }
    }

    chartData.push(cpu);
    chartData.push(memory);

    return chartData;
};
