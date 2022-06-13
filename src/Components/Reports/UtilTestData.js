/* eslint-disable camelcase */

export const sysResponseTestData = [
    {
        fqdn: 'ip-172-31-28-69.ec2.internal',
        display_name: 'ip-172-31-28-69.ec2.internal', /* eslint-disable-line camelcase */
        inventory_id: 'cd96482e-1fcb-49b4-958d-06315da16b9a', /* eslint-disable-line camelcase */
        account: '6089719',
        number_of_suggestions: 1, /* eslint-disable-line camelcase */
        state: 'Undersized',
        performance_utilization: {  /* eslint-disable-line camelcase */
            cpu: 90, memory: 97,
            max_io: 0.314, io_all: { xvda: 0.314 }  /* eslint-disable-line camelcase */
        },
        cloud_provider: 'aws',  /* eslint-disable-line camelcase */
        instance_type: 't2.micro',  /* eslint-disable-line camelcase */
        idling_time: '19.70',  /* eslint-disable-line camelcase */
        os: 'RHEL 8.4',
        report_date: '2022-03-29'  /* eslint-disable-line camelcase */
    },
    {
        fqdn: 'ip-172-31-28-69.ec2.internal',
        display_name: 'ros-system.internal', /* eslint-disable-line camelcase */
        inventory_id: 'cd96482e-1fcb-49b4-958d-06315da16b9a', /* eslint-disable-line camelcase */
        account: '6089719',
        number_of_suggestions: 1, /* eslint-disable-line camelcase */
        state: 'Undersized',
        performance_utilization: {  /* eslint-disable-line camelcase */
            cpu: 90, memory: 97,
            max_io: 0.314, io_all: { xvda: 0.314 }  /* eslint-disable-line camelcase */
        },
        cloud_provider: 'aws',  /* eslint-disable-line camelcase */
        instance_type: 't2.micro',  /* eslint-disable-line camelcase */
        idling_time: '19.70',  /* eslint-disable-line camelcase */
        os: 'RHEL 8.4',
        report_date: '2022-03-30 00:01:37+00:00'  /* eslint-disable-line camelcase */
    }
];

export const executiveReponseTestData = {
    systems_per_state: {
        under_pressure: {
            count: 0,
            percentage: 5.57
        },
        undersized: {
            count: 1,
            percentage: 7.68
        },
        oversized: {
            count: 7,
            percentage: 8.91
        },
        waiting_for_data: {
            count: 8,
            percentage: 5.57
        },
        idling: {
            count: 8,
            percentage: 5.57
        }
    },
    conditions: {
        cpu: {
            count: 23,
            percentage: 20.88,
            undersized: null,
            oversized: 0,
            under_pressure: 10
        },
        io: {
            count: 23,
            percentage: 20.88,
            undersized: -1,
            oversized: -1,
            under_pressure: 10
        },
        memory: {
            count: 23,
            percentage: 20.88,
            undersized: 10,
            oversized: null,
            under_pressure: 10
        }
    },
    meta: {
        total_count: 55,
        non_optimized_count: 23,
        conditions_count: 69
    }
};

