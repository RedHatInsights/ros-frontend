import React, { useState, useEffect, Fragment }  from 'react';
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartScatter,
  ChartThemeColor,
  createContainer,
} from "@patternfly/react-charts";
import { Dropdown, DropdownItem, DropdownToggle, EmptyState, Title, Tooltip } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import './HistoricalDataChart.scss';
import { series, series_7_days, series_less_days_45, series_random_days, tick_values_45, tick_values_7 } from './Constant';
import { fetchSystemHistory } from '../../Utilities/api';



export const HistoricalDataChart = ({ inventoryId }) => {

    const [isOpen, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState(7);
    const [chartData, setChartData] = useState([]);
    const [showError, setError] = useState(false);
    
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    const dropdownItems =[
        <DropdownItem key="action" component="button" onClick={() => updateChart(7)}>Last 7 Days</DropdownItem>,
        <DropdownItem key="action" component="button" onClick={() => updateChart(49)}>Last 45 Days</DropdownItem>
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formatHistoricalData = (data) =>{
        console.log("Historical data:", data);
        
        const chartData = [];
        let today = new Date();

        const cpu = {
            datapoints: []
        };

        const memory = {
            datapoints: []
        }

        let foundData = false;

        for (let i=(dateRange-1); i >= 0; i--) {
            foundData = false;
            let dateToCheck = new Date();
            dateToCheck =   new Date(dateToCheck.setDate(today.getDate() - i)).toDateString();
            console.log("Date to check:", dateToCheck, i );
            
            data.map((dataObj) => {
                let reportDate = new Date(dataObj.report_date).toDateString();    

                //console.log("Checking..",reportDate, dateToCheck, reportDate === dateToCheck );
                
                if(!foundData && reportDate === dateToCheck) {
                    
                    cpu.datapoints.push({
                        name: "CPU Utilization", 
                        x: new Date(dateToCheck), 
                        y: dataObj.cpu
                    });

                    memory.datapoints.push({
                        name: "Memory Utilization", 
                        x: new Date(dateToCheck), 
                        y: dataObj.memory
                    })

                    foundData = true;
                } 
            })

            if(!foundData) {
                cpu.datapoints.push({
                    name: "CPU Utilization", 
                    x: new Date(dateToCheck), 
                    y: null
                });

                memory.datapoints.push({
                    name: "Memory Utilization", 
                    x: new Date(dateToCheck), 
                    y: null
                })
            }
        }

        chartData.push(cpu);
        chartData.push(memory);
        console.log("Chart datat:", chartData);
        setChartData(chartData);
    }

    useEffect(async () => {
        setChartData([]);
        try {
            const limit = dateRange === 7 ? 7 : 45;
            const historicalDataResponse = await fetchSystemHistory(inventoryId, limit);
            console.log("Historical Response:", historicalDataResponse);
            formatHistoricalData(historicalDataResponse.data);
        } catch(error){
            console.log("Error:", error);
            setError(true);
        }

    }, [dateRange]);
    

    const onToggle = (isOpen) => {
        setOpen(isOpen);
    }


    const updateChart = (dRange) => {
       
        dRange !== dateRange && setChartData([]);
        setDateRange(dRange);
        setOpen(!isOpen);
        // if(dateRange === 7){
        //     setChartData(series_7_days);
        // } 
        // else if(dateRange === 45){
        //     setChartData(series_random_days);
        // }
    }


    const getEntireDomain = () => {
        const xDomain = dateRange === 7 ?  [chartData[0].datapoints[0].x, chartData[0].datapoints[6].x] : [chartData[0].datapoints[0].x, chartData[0].datapoints[48].x]
        return {
            y: [0, 100],
            x: xDomain
        };
    }


    console.log("Render Chart Data:", chartData, showError );

    return(
        <div className='chartContainer'>
            {
                chartData.length === 0 ?
                <EmptyState className='loading' > 
                    <Title size="lg" headingLevel="h4">
                        { showError ? 'Something went wrong while loading historical chart' :  'Loading hostorical chart...'}
                    </Title>
                </EmptyState> :
                <Fragment>
                    <span className='dropdownContainer'>
                        <Tooltip content={<div>Scroll and pan to zoom and move</div>}>
                            <OutlinedQuestionCircleIcon size='sm' />
                        </Tooltip>
                        <Dropdown
                            className='dateDropdown'
                            toggle={
                                <DropdownToggle 
                                id='chart-date-toggle' 
                                onToggle={onToggle} 
                                toggleIndicator={CaretDownIcon} >
                                {`Last ${dateRange === 7 ? 7 : 45} Days`}
                                </DropdownToggle>
                            }
                            isOpen={isOpen}
                            dropdownItems={dropdownItems}
                        />
                    </span>
                    
                    <div style={{ height: "275px" }}>
                        <Chart
                            domain={getEntireDomain()}
                            scale={{x: "time", y: "linear"}}
                            ariaDesc="System Utilization"
                            ariaTitle="System Utilization"
                            containerComponent={
                                <VictoryZoomVoronoiContainer 
                                    labels={({ datum }) => {
                                        return datum.childName.includes('scatter-') && datum.y !== null ? `${datum.name}: ${datum.y}%` : null} 
                                    } 
                                    constrainToVisibleArea
                                    voronoiDimension="x"
                                    zoomDimension="x"
                                />
                            }
                            legendData={[{ name: "CPU Utilization" }, { name: "Memory Utilization" }]}
                            legendOrientation="vertical"
                            legendPosition="right"
                            height={275}
                            width={756}
                            maxDomain={{ y: 100 }}
                            minDomain={{ y: 0 }}
                            padding={{
                                bottom: 50,
                                left: 50,
                                right: 200, // Adjusted to accommodate legend
                                top: 50
                            }}
                            themeColor={ChartThemeColor.blue}>

                            <ChartAxis 
                                tickValues={chartData[0].datapoints.map(d => d.x)}
                                tickFormat={(x) => {
                                    const isToday = new Date().toDateString() === new Date(x).toDateString();
                                    return isToday ? 'Today' : `${new Date(x).getDate()} ${months[new Date(x).getMonth()]}`}
                                }
                                fixLabelOverlap 
                                tickCount={6}
                            
                                />
                            <ChartAxis 
                                dependentAxis showGrid 
                                tickValues={[0, 20, 40, 60, 80, 100]}
                                tickFormat={(t) => `${t}%`} />


                            <ChartGroup>
                                {chartData.map((s, idx) => {
                                    return (
                                    <ChartScatter
                                        data={s.datapoints}
                                        key={"scatter-" + idx}
                                        name={"scatter-" + idx}
                                        
                                    />
                                    );
                                })}
                            </ChartGroup>

                            <ChartGroup>
                                {chartData.map((s, idx) => {
                                    return (
                                    <ChartLine
                                        key={"line-" + idx}
                                        name={"line-" + idx}
                                        data={s.datapoints}
                                        
                                    />
                                    );
                                })}
                            </ChartGroup>

                        </Chart>
                    </div>
                </Fragment>
            }
        </div>
    );

};