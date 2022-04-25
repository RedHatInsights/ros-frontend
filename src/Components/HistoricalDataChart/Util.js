export const formatHistoricalData = (responseData, dateRange) =>{

    const chartData = [];
    let today = new Date();

    const cpu = {
        datapoints: []
    };

    const memory = {
        datapoints: []
    };

    let dataFound = false;

    for (let i = (dateRange - 1); i >= 0; i--) {
        dataFound = false;
        let dateToCheck = new Date();
        dateToCheck =   new Date(dateToCheck.setDate(today.getDate() - i)).toDateString();

        responseData.map((dataObj) => {
            let reportDate = new Date(dataObj.report_date).toDateString();

            if (!dataFound && reportDate === dateToCheck) {

                cpu.datapoints.push({
                    name: 'CPU Utilization',
                    x: new Date(dateToCheck),
                    y: dataObj.cpu
                });

                memory.datapoints.push({
                    name: 'Memory Utilization',
                    x: new Date(dateToCheck),
                    y: dataObj.memory
                });

                dataFound = true;
            }
        });

        if (!dataFound) {
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
