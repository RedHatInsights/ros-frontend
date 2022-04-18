import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
    bodyCell: {
        textAlign: 'left',
        fontSize: 8,
        paddingBottom: 2,
        paddingTop: 2,
        paddingRight: 2,
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
        paddingRight: 2
    },
    lastReportedCell: {
        textAlign: 'left',
        fontSize: 8,
        flex: 1.2,
        paddingBottom: 2,
        paddingTop: 2,
        paddingRight: 2
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
    }

});
