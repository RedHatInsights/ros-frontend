import React, { useState }  from 'react';
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartScatter,
  ChartThemeColor,
  createContainer
} from "@patternfly/react-charts";
import { Dropdown, DropdownItem, DropdownToggle, Tooltip } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import './HistoricalDataChart.scss';



export const HistoricalDataChart = () => {

    const [isOpen, setOpen] = useState(false);

    const series = [
        {
          datapoints: [
            { name: "CPU Utilization", x: "1 Apr", y: 10 },
            { name: "CPU Utilization", x: "2 Apr", y: 20 },
            { name: "CPU Utilization", x: "3 Apr", y: 30 },
            { name: "CPU Utilization", x: "4 Apr", y: 50 },
            { name: "CPU Utilization", x: "5 Apr", y: 40 },
            { name: "CPU Utilization", x: "6 Apr", y: 30 },
            { name: "CPU Utilization", x: "Today", y: 20 }
          ]
        },
        {
          datapoints: [
            { name: "Memory Utilization", x: "1 Apr", y: 20 },
            { name: "Memory Utilization", x: "2 Apr", y: 25 },
            { name: "Memory Utilization", x: "3 Apr", y: 30 },
            { name: "Memory Utilization", x: "4 Apr", y: 40 },
            { name: "Memory Utilization", x: "5 Apr", y: 30 },
            { name: "Memory Utilization", x: "6 Apr", y: 20 },
            { name: "Memory Utilization", x: "Today", y: 10 }
          ]
        }
    ];  
    
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    const onToggle = (isOpen) => {
        setOpen(isOpen);
    }

    const onSelect = (event, value) => {
        setOpen(!isOpen);
        console.log("checking:", event, value);
    }

    const dropdownItems =[
        <DropdownItem key="action" component="button">Last 7 Days</DropdownItem>,
        <DropdownItem key="action" component="button">Last 45 Days</DropdownItem>
    ]

    return(
        <div>
            <span>
                <Tooltip content={<div>Scroll or pan to zoom in</div>}>
                    <OutlinedQuestionCircleIcon size='sm' />
                </Tooltip>
                <Dropdown
                    className='dateDropdown'
                    onSelect={onSelect}
                    toggle={
                        <DropdownToggle 
                        id='chart-date-toggle' 
                        onToggle={onToggle} toggleIndicator={CaretDownIcon} >
                        Last 7 Days
                        </DropdownToggle>
                    }
                    isOpen={isOpen}
                    dropdownItems={dropdownItems}
                />
            </span>
            
            <div style={{ height: "275px" }}>
            <Chart
                ariaDesc="System Utilization"
                ariaTitle="System Utilization"
                containerComponent={
                    <VictoryZoomVoronoiContainer 
                        labels={({ datum }) => datum.childName.includes('line-') ? `${datum.name}: ${datum.y}%` : null}  
                        constrainToVisibleArea
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
                <ChartAxis />
                <ChartAxis 
                    dependentAxis showGrid 
                    tickValues={[0, 20, 40, 60, 80, 100]}
                    tickFormat={(t) => `${t}%`} />
                <ChartGroup>
                {series.map((s, idx) => {
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
                {series.map((s, idx) => {
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