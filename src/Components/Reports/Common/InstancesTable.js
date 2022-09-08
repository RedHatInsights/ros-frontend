import React from 'react';
import propTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import styles from './styles';

export const InstancesTable = ({ id, instanceDetails, heading, description }) => {
    return (
        <View>
            <Text style={id === 'current_instance_types' ? styles.instanceTypeHeadingFirst : styles.instanceTypeHeading}>{heading}</Text>
            <Text style={styles.instanceTypeDesc}>{description}</Text>
            <View key={id} style={styles.instanceTableRow}>
                <Text style={[{ width: 100 }, styles.instanceTableHeading]}>Instance type</Text>
                <Text style={[{ width: 80 }, styles.instanceTableHeading]}>
                    {`# of ${ id === 'historical_instance_types' ? 'times' : 'systems'}`}
                </Text>
                <Text style={[{ flex: 1 }, styles.instanceTableHeading]}>Description</Text>
            </View>
            {
                instanceDetails.map(
                    (instanceDetail, index) => <View key={`${id}-${index}`} style={styles.instanceTableRow}>
                        <Text style={{ width: 100 }}>{instanceDetail.type}</Text>
                        <Text style={{ width: 80, paddingLeft: 4 }}>{instanceDetail.systemCount}</Text>
                        <Text style={{ flex: 1 }}>{instanceDetail.description}</Text>
                    </View>)
            }
        </View>
    );
};

InstancesTable.propTypes = {
    id: propTypes.string,
    instanceDetails: propTypes.array,
    heading: propTypes.string,
    description: propTypes.string
};

