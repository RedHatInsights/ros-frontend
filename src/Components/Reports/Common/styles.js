import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
    bodyCell: {
        textAlign: 'left',
        fontSize: 8,
        paddingBottom: 2,
        paddingTop: 2,
        paddingLeft: 2,
        flex: 1
    },
    headerCell: {
        textAlign: 'left',
        fontSize: 8,
        flex: 1
    },
    systemNameCell: {
        textAlign: 'left',
        fontSize: 8,
        flex: 2.5,
        paddingBottom: 2,
        paddingTop: 2,
        paddingRight: 4
    },
    lastReportedCell: {
        textAlign: 'left',
        fontSize: 8,
        flex: 1.2,
        paddingBottom: 2,
        paddingTop: 2,
        paddingLeft: 2
    },
    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    execHeading: {
        textAlign: 'left',
        fontSize: 10,
        color: '#C9190B',
        marginBottom: 4,
        marginTop: 10
    },
    occurrenceHeading: {
        textAlign: 'left',
        fontSize: 10,
        color: '#C9190B',
        marginTop: 12,
        marginBottom: -4
    },
    execInfoText: {
        flex: 1,
        textAlign: 'right',
        fontSize: 7,
        color: '#6A6E73'
    },
    instanceTypeHeading: {
        textAlign: 'left',
        fontSize: 10,
        color: '#C9190B',
        marginTop: 20
    },
    instanceTypeHeadingFirst: {
        textAlign: 'left',
        fontSize: 10,
        color: '#C9190B'
    },
    instanceTypeDesc: {
        fontSize: 10,
        textAlign: 'left',
        marginBottom: 4
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    tableRowBackground: {
        /*variable --pf-global--BorderColor--300 value #f0f0f0
          also --pf-global--BackgroundColor--200
          import global_BackgroundColor_200 from '@patternfly/react-tokens/dist/js/global_BackgroundColor_200';
          with v6 it is #F2F2F2 so adding directly color code
        */
        backgroundColor: '#F0F0F0'
    },
    instanceTableHeading: {
        fontSize: 10,
        color: '#6A6E73',
        paddingBottom: 4,
        fontWeight: 'bold'
    },
    bold: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 700
    }

});
