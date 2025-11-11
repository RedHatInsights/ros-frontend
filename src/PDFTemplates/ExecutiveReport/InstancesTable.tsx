/* eslint-disable camelcase */
import React from 'react';
import { Content } from '@patternfly/react-core';

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
            <Content
                style={{
                    textAlign: 'left',
                    fontSize: 16,
                    color: '#C9190B',
                    fontWeight: 'bold'
                }}
            >
                {heading}
            </Content>
            <Content style={{ fontSize: 14, textAlign: 'left', marginBottom: 4 }}>
                {description}
            </Content>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Content
                    style={{
                        width: 140,
                        fontSize: 14,
                        color: '#6A6E73',
                        paddingBottom: 4
                    }}
                >
                  Instance type
                </Content>
                <Content
                    style={{
                        width: 120,
                        fontSize: 14,
                        color: '#6A6E73',
                        paddingBottom: 4
                    }}
                >
                  # of {id === 'historical_instance_types' ? 'times' : 'systems'}
                </Content>
                <Content
                    style={{ flex: 1, fontSize: 14, color: '#6A6E73', paddingBottom: 4 }}
                >
                  Description
                </Content>
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
                                backgroundColor: '#F0F0F0'
                            })
                        }}
                    >
                        <Content style={{ width: 140, fontSize: 14 }}>
                            {instanceDetail.type}
                        </Content>
                        <Content style={{ width: 120, fontSize: 14 }}>
                            {instanceDetail.count}
                        </Content>
                        <Content style={{ flex: 1, fontSize: 14 }}>{instanceDetail.desc}</Content>
                    </div>
                ))
            ) : (
                <Content
                    style={{
                        fontSize: 14,
                        color: '#6A6E73',
                        paddingBottom: 16,
                        fontWeight: 'bold'
                    }}
                >
                  No data available.
                </Content>
            )}
        </div>
    );
};
