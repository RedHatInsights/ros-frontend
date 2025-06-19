/* eslint-disable camelcase */
import React from 'react';
import { Text } from '@patternfly/react-core';
import global_BorderColor_300 from '@patternfly/react-tokens/dist/js/global_BorderColor_300';

export type InstanceHighlights = {
  type: string;
  count: number;
  desc: string;
};

type InstancesTableProps = {
  id: string;
  instanceDetails: InstanceHighlights[];
  heading: string;
  description: string;
};

export const InstancesTable: React.FC<InstancesTableProps> = ({
    id,
    instanceDetails,
    heading,
    description
}) => {
    return (
        <div>
            <Text
                style={{
                    textAlign: 'left',
                    fontSize: 16,
                    color: '#C9190B',
                    fontWeight: 'bold'
                }}
            >
                {heading}
            </Text>
            <Text style={{ fontSize: 14, textAlign: 'left', marginBottom: 4 }}>
                {description}
            </Text>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Text
                    style={{
                        width: 140,
                        fontSize: 14,
                        color: '#6A6E73',
                        paddingBottom: 4
                    }}
                >
                  Instance type
                </Text>
                <Text
                    style={{
                        width: 120,
                        fontSize: 14,
                        color: '#6A6E73',
                        paddingBottom: 4
                    }}
                >
                  # of {id === 'historical_instance_types' ? 'times' : 'systems'}
                </Text>
                <Text
                    style={{ flex: 1, fontSize: 14, color: '#6A6E73', paddingBottom: 4 }}
                >
                  Description
                </Text>
            </div>
            {instanceDetails.length > 0 ? (
                instanceDetails.map((instanceDetail, index) => (
                    <div
                        key={`${id}-${index}`}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 4,
                            ...(index % 2 && {
                                backgroundColor: global_BorderColor_300.value
                            })
                        }}
                    >
                        <Text style={{ width: 140, fontSize: 14 }}>
                            {instanceDetail.type}
                        </Text>
                        <Text style={{ width: 120, fontSize: 14 }}>
                            {instanceDetail.count}
                        </Text>
                        <Text style={{ flex: 1, fontSize: 14 }}>{instanceDetail.desc}</Text>
                    </div>
                ))
            ) : (
                <Text
                    style={{
                        fontSize: 14,
                        color: '#6A6E73',
                        paddingBottom: 16,
                        fontWeight: 'bold'
                    }}
                >
                  No data available.
                </Text>
            )}
        </div>
    );
};
