import React, { useState, useEffect } from 'react';
// import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";
import { VictoryZoomContainer } from "victory-zoom-container";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartScatter,
  ChartThemeColor,
} from "@patternfly/react-charts";



export const HistoricalDataChart = () => {

    const series = [
        {
          datapoints: [
            { name: "CPU Utilization", x: "1 Apr", y: 10 },
            { name: "CPU Utilization", x: "2 Apr", y: 20 },
            { name: "CPU Utilization", x: "3 Apr", y: 50 },
            { name: "CPU Utilization", x: "4 Apr", y: 90 },
            { name: "CPU Utilization", x: "5 Apr", y: 0 },
            { name: "CPU Utilization", x: "6 Apr", y: 80 },
            { name: "CPU Utilization", x: "Today", y: 40 }
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
    

    return(
        <div>
            <div style={{ height: "275px" }}>
            <Chart
                ariaDesc="System Utilization"
                ariaTitle="System Utilization"
                containerComponent={
                    <VictoryZoomContainer
                        responsive={false}
                        zoomDimension="x"
                        labels={({ datum }) => datum.childName.includes('line-') ? `${datum.name}: ${datum.y}` : null}  
                    />
                }
                legendData={[{ name: "CPU Utilization" }, { name: "Memory Utilization" }]}
                legendOrientation="vertical"
                legendPosition="right"
                height={275}
                maxDomain={{ y: 100 }}
                minDomain={{ y: 0 }}
                padding={{
                    bottom: 50,
                    left: 50,
                    right: 200, // Adjusted to accommodate legend
                    top: 50
                }}
                themeColor={ChartThemeColor.blue}
                width={756}
            >
                <ChartAxis tickValues={[20, 30, 40]} />
                <ChartAxis dependentAxis showGrid tickValues={[20, 50, 80]} />
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