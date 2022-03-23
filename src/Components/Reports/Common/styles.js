import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
    bodyCell: {
        textAlign: 'center',
        fontSize: 8,
        paddingBottom: 2,
        paddingTop: 2,
        paddingRight: 2,
        flex: 1
    },
    headerCell: {
        textAlign: 'center',
        fontSize: 8,
        flex: 1
    },
    systemNameCell: {
        textAlign: 'left',
        fontSize: 8,
        flex: 2.5,
        paddingBottom: 2,
        paddingTop: 2,
        paddingRight: 2,
    },
    osCell: {
        textAlign: 'left',
        fontSize: 8,
        flex: 0.8,
        paddingBottom: 2,
        paddingTop: 2,
        paddingRight: 2,
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
