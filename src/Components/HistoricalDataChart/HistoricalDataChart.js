import React, { useState }  from 'react';
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartScatter,
  ChartThemeColor,
  createContainer,
} from "@patternfly/react-charts";
import { Dropdown, DropdownItem, DropdownToggle, Tooltip } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import './HistoricalDataChart.scss';
import { series, series_7_days, series_less_days_45, series_random_days, tick_values_45, tick_values_7 } from './Constant';



export const HistoricalDataChart = () => {

    const [isOpen, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState(7);
    const [chartData, setChartData] = useState(series_7_days);
    
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    const onToggle = (isOpen) => {
        setOpen(isOpen);
    }


    const updateChart = (dateRange) => {
        setDateRange(dateRange);
        if(dateRange === 7){
            setChartData(series_7_days);
        } else if(dateRange === 45){
            setChartData(series_random_days);
        }
    }

    const dropdownItems =[
        <DropdownItem key="action" component="button" onClick={() => updateChart(7)}>Last 7 Days</DropdownItem>,
        <DropdownItem key="action" component="button" onClick={() => updateChart(45)}>Last 45 Days</DropdownItem>
    ]

    const getEntireDomain = () => {
        const xDomain = dateRange === 7 ?  [new Date('2022-03-31'), new Date('2022-04-07')] : [new Date('2022-03-28'), new Date('2022-05-15')]
        return {
            y: [0, 100],
            x: xDomain
        };
    }


    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return(
        <div className='chartContainer'>
            <span className='dropdownContainer'>
                <Tooltip content={<div>Scroll and pan to zoom and move</div>}>
                    <OutlinedQuestionCircleIcon size='sm' />
                </Tooltip>
                <Dropdown
                    className='dateDropdown'
                    toggle={
                        <DropdownToggle 
                        id='chart-date-toggle' 
                        onToggle={onToggle} toggleIndicator={CaretDownIcon} >
                        {`Last ${dateRange} Days`}
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
                        tickFormat={(x) => `${new Date(x).getDate()} ${months[new Date(x).getMonth()]}`}
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
        </div>
    );

};