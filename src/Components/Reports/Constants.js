// Reports

export const SYSTEMS_PDF_REPORT_TITLE = 'Insights Resource Optimization Systems Report';
export const SYSTEMS_REPORT_FILE_NAME = 'resource_optimization--';
export const EXECUTIVE_REPORT_FILE_NAME = 'Resource-Optimization-Executive-Report--';

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

