import React from 'react';
import propTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import { IconCanvas } from './IconCanvas';
import styles from './styles';

export const InstancesTable = ({ id, instanceDetails, heading, description }) => {
    console.log("Checking:", id, id === 'current_instance_types');
    return (
        <View>
            <Text style={id === 'current_instance_types' ? styles.instanceTypeHeadingFirst : styles.instanceTypeHeading}>{heading}</Text>
            <Text style={styles.instanceTypeDesc}>{description}</Text>
            <View key={id} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: 100, fontSize: 12, color: '#909090', paddingBottom: 4 }}>Instance Type</Text>
                    <Text style={{ width: 80, fontSize: 12, color: '#909090', paddingBottom: 4}}>{`# of ${ id=== 'historical_instance_types' ? 'times' :'systems'}`}</Text>
                    <Text style={{ flex: 1, fontSize: 12, color: '#909090', paddingBottom: 4}}>Description</Text>
            </View>
            {
                instanceDetails.map(
                    (instanceDetail, index) => <View key={`${id}-${index}`} style={{ display: 'flex', flexDirection: 'row'  }}>
                        <Text style={{ width: 100, fontSize: 10 }}>{instanceDetail.type}</Text>
                        <Text style={{ width: 80, fontSize: 10, paddingLeft: 4 }}>{instanceDetail.systemCount}</Text>
                        <Text style={{ flex: 1, fontSize: 10 }}>{instanceDetail.description}</Text>
                    </View>)
            }
        </View>
    );
};

InstancesTable.propTypes = {
    type: propTypes.string,
    description: propTypes.string,
    systemCount: propTypes.string
};

