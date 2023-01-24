import React, { useState, useEffect }  from 'react';
import {
    Chart,
    ChartAxis,
    ChartCursorTooltip,
    ChartGroup,
    ChartLabel,
    ChartLine,
    ChartScatter,
    ChartThemeColor,
    createContainer
} from '@patternfly/react-charts';
import {
    Bullseye, Dropdown, DropdownItem, DropdownToggle,
    EmptyState, EmptyStateBody, EmptyStateVariant, Spinner, Title, Tooltip, Flex, FlexItem
} from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import './HistoricalDataChart.scss';
import { fetchSystemHistory } from '../../Utilities/api';
import { formatHistoricalData } from './Util';
import { DATE_RANGE_49_DAYS, DATE_RANGE_7_DAYS, MONTHS, RANGE_DROPDOWN_45_DAYS } from '../../constants';
import propTypes from 'prop-types';

export const HistoricalDataChart = ({ inventoryId }) => {

    const [isOpen, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState(DATE_RANGE_7_DAYS);
    const [chartData, setChartData] = useState([]);
    const [showError, setError] = useState(false);

    const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

    useEffect(() => {
        setChartData([]);
        async function getHistoricalData() {
            try {
                const limit = dateRange === DATE_RANGE_7_DAYS ? DATE_RANGE_7_DAYS : RANGE_DROPDOWN_45_DAYS;
                const historicalDataResponse = await fetchSystemHistory(inventoryId, limit);
                const formattedChartData = formatHistoricalData(historicalDataResponse.data, dateRange);
                setChartData(formattedChartData);
            } catch (error) {
                setError(true);
            }
        }

        getHistoricalData();

    }, [dateRange]); // eslint-disable-line react-hooks/exhaustive-deps

    const updateChartRange = (dRange) => {
        dRange !== dateRange && setChartData([]);
        setDateRange(dRange);
        setOpen(!isOpen);
    };

    const getEntireDomain = () => {
        const today = new Date();
        let startDate = new Date();
        const numberOfDays = dateRange === DATE_RANGE_7_DAYS ? DATE_RANGE_7_DAYS : DATE_RANGE_49_DAYS;
        startDate =   new Date(startDate.setDate(today.getDate() - numberOfDays));

        const xDomain = [startDate, today];

        return {
            y: [0, 100],
            x: xDomain
        };
    };

    const dropdownItems = [
        <DropdownItem key="action_7" component="button" onClick={() => updateChartRange(DATE_RANGE_7_DAYS)}>Last 7 Days</DropdownItem>,
        <DropdownItem key="action_45" component="button" onClick={() => updateChartRange(DATE_RANGE_49_DAYS)}>Last 45 Days</DropdownItem>
    ];

    const onToggle = (isOpen) => {
        setOpen(isOpen);
    };

    const displayError = () => {
        return  <FlexItem alignSelf={{ default: 'alignSelfBaseline' }}>
            <EmptyState variant={EmptyStateVariant.small}>
                <Title headingLevel="h2" size="lg">
                    Something went wrong
                </Title>
                <EmptyStateBody>
                    There was a problem while requesting historical data. Please try again later.
                </EmptyStateBody>
            </EmptyState>
        </FlexItem>;
    };

    const getTooltipLabels = (datum) => {
        const xDate = new Date(datum.x);
        const isToday = new Date().toDateString() === xDate.toDateString();
        let xDateString = isToday ? 'Today' : `${xDate.getDate()} ${MONTHS[xDate.getMonth()]}`;
        xDateString = datum.name.includes('CPU') ? `${xDateString}\n   \n` : '';
        return datum.childName.includes('scatter-')
                && datum.y !== null ? `${xDateString}${datum.name}: ${datum.y}%` : null;
    };

    const displayChart = () => {
        return  chartData.length === 0 ?
            <FlexItem alignSelf={{ default: 'alignSelfBaseline' }}>
                <Bullseye>
                    <Spinner size="xl" aria-labelledby="loading-historical-chart"/>
                </Bullseye>
            </FlexItem> :
            <Flex direction={{ default: 'column' }} alignSelf={{ default: 'alignSelfBaseline' }} align={{ default: 'alignRight' }}>
                <FlexItem align={{ default: 'alignRight' }}>
                    <div className="chartDateFilter">
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
                                    {`Last ${dateRange === DATE_RANGE_7_DAYS ? DATE_RANGE_7_DAYS : RANGE_DROPDOWN_45_DAYS} Days`}
                                </DropdownToggle>
                            }
                            isOpen={isOpen}
                            dropdownItems={dropdownItems}
                        />
                    </div>
                </FlexItem>
                <FlexItem align={{ default: 'alignRight' }} className='historical-chart-panel'>
                    <Chart
                        domain={getEntireDomain()}
                        scale={{ x: 'time', y: 'linear' }}
                        containerComponent={
                            <VictoryZoomVoronoiContainer
                                labels={({ datum }) => getTooltipLabels(datum)}
                                labelComponent={
                                    <ChartCursorTooltip
                                        labelComponent={<ChartLabel
                                            style={[
                                                { fill: 'white', fontSize: 16,  fontWeight: 700 },
                                                { fill: 'white' },
                                                { fill: 'white' },
                                                { fill: 'white' }
                                            ]}/>}
                                    />
                                }
                                constrainToVisibleArea
                                voronoiDimension="x"
                                zoomDimension="x"
                            />
                        }
                        legendData={[{ name: 'CPU Utilization' }, { name: 'Memory Utilization' }]}
                        legendOrientation="vertical"
                        legendPosition="right"
                        height={275}
                        width={756}
                        maxDomain={{ y: 100 }}
                        minDomain={{ y: 0 }}
                        padding={{
                            bottom: 50,
                            left: 50,
                            right: 165, // Adjusted to accommodate legend
                            top: 50
                        }}
                        themeColor={ChartThemeColor.blue}>

                        <ChartAxis
                            tickValues={chartData[0].datapoints.map(d => d.x)}
                            tickFormat={(x) => {
                                const isToday = new Date().toDateString() === new Date(x).toDateString();
                                return isToday ? 'Today' : `${new Date(x).getDate()} ${MONTHS[new Date(x).getMonth()]}`;}
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
                                        key={'scatter-' + idx}
                                        name={'scatter-' + idx}

                                    />
                                );
                            })}
                        </ChartGroup>

                        <ChartGroup>
                            {chartData.map((s, idx) => {
                                return (
                                    <ChartLine
                                        key={'line-' + idx}
                                        name={'line-' + idx}
                                        data={s.datapoints}

                                    />
                                );
                            })}
                        </ChartGroup>

                    </Chart>
                </FlexItem>
            </Flex>;
    };

    return (
        showError ?  displayError() : displayChart()
    );

};

HistoricalDataChart.propTypes = {
    inventoryId: propTypes.string
};
