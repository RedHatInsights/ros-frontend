import { TachometerAltIconConfig } from '@patternfly/react-icons/dist/js/icons/tachometer-alt-icon';
import { AngleDoubleDownIconConfig } from '@patternfly/react-icons/dist/js/icons/angle-double-down-icon';
import { AngleDoubleUpIconConfig } from '@patternfly/react-icons/dist/js/icons/angle-double-up-icon';
import { AutomationIconConfig } from '@patternfly/react-icons/dist/js/icons/automation-icon';
import { InProgressIconConfig } from '@patternfly/react-icons/dist/js/icons/in-progress-icon';
import { CheckCircleIconConfig } from '@patternfly/react-icons/dist/js/icons/check-circle-icon';

// Reports

export const SYSTEMS_PDF_REPORT_TITLE = 'Insights Resource Optimization Systems Report';
export const SYSTEMS_REPORT_FILE_NAME = 'resource_optimization--';

export const pdfRowKeys = ['display_name', 'os', 'performance_utilization.cpu', 'performance_utilization.memory', 'performance_utilization.max_io',
    'number_of_suggestions', 'state', 'report_date'];

export const reportRowKeys = ['display_name', 'os', 'performance_utilization.cpu', 'performance_utilization.memory', 'performance_utilization.max_io',
    'number_of_suggestions', 'state', 'cloud_provider', 'instance_type', 'idling_time', 'report_date'];

export const percentageKeys = ['performance_utilization.cpu', 'performance_utilization.memory', 'idling_time'];

export const PDF_RECORDS_PER_PAGE = {
    firstPageCount: 16,
    otherPageCount: 22

};

export const REPORT_NOTIFICATIONS = {
    start: {
        variant: 'info',
        title: 'Generating data. Download may take a moment to start.'
    },
    success: {
        variant: 'success',
        title: 'Export successful'
    },
    failure: {
        variant: 'danger',
        autoDismiss: false,
        title: 'Export failed. Please try exporting again.'
    }
};


export const sysStatesDescription = [
    {
        title: 'Optimized',
        description: 'Performing at an optimal level',
        iconPath: CheckCircleIconConfig.svgPath,
        iconScale: 0.014,
        fillColor: 'green'
    },
    {
        title: 'Under pressure',
        description: 'Peaking occasionally',
        iconPath: TachometerAltIconConfig.svgPath,
        iconScale: 0.014,
        fillColor: '#030303'
    },
    {
        title: 'Undersized',
        description: 'Using more than 80% of system resources',
        iconPath: AngleDoubleDownIconConfig.svgPath,
        iconScale: 0.014,
        fillColor: 'red'
    },
    {
        title: 'Oversized',
        description: 'Using less than 20% of system resources',
        iconPath: AngleDoubleUpIconConfig.svgPath,
        iconScale: 0.014,
        fillColor: '#f09800'
    },
    {
        title: 'Idling',
        description: 'Consuming less than 5% of resources',
        iconPath: AutomationIconConfig.svgPath,
        iconScale: 0.008,
        fillColor: '#030303'
    },
    {
        title: 'Waiting for data',
        description: 'Data has not been received or is being processed. Initial data processing takes up to 24 hours.',
        iconPath: InProgressIconConfig.svgPath,
        iconScale: 0.008,
        fillColor: '#2B9AF3'
    }
];

export const conditionsDescription = [
    {
        title: 'CPU pressure',
        description: 'CPU registered peaks higher than 20% over several one-minute time periods'
    },
    {
        title: 'Disk I/O  pressure',
        description: 'Disk I/O registered peaks higher than 20% over several one-minute time periods'
    },
    {
        title: 'RAM pressure',
        description: 'RAM registered peaks higher than 20% over several one-minute time periods'
    }
];