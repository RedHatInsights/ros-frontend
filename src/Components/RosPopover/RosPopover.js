import React from 'react';
import {
    Button,
    Flex,
    Popover,
    Content,
    ContentVariants,
    Title
} from '@patternfly/react-core';
import {
    ExternalLinkAltIcon,
    OutlinedQuestionCircleIcon
} from '@patternfly/react-icons';
import useFeatureFlag from '../../Utilities/useFeatureFlag';

export const RosPopover = () => {
    const isLightspeedEnabled = useFeatureFlag('platform.lightspeed-rebrand');
    const productNameText = isLightspeedEnabled ? 'Red Hat Lightspeed' : 'Insights';
    return (
        <Popover
            aria-label="Resource optimization popover"
            headerContent={<Title headingLevel="h4">{'About resource optimization'}</Title>}
            position="right"
            maxWidth="650px"
            bodyContent={
                <Content>
                    <Flex direction={{ default: 'column' }}>
                        <Content component={ContentVariants.p}>
                        The resource optimization service enables RHEL customers to assess and monitor their public cloud usage and optimization.
                        </Content>
                        <Content component={ContentVariants.a}
                            href={
                                // eslint-disable-next-line max-len
                                'https://docs.redhat.com/en/documentation/red_hat_lightspeed/1-latest/html/assessing_and_monitoring_rhel_resource_optimization_with_red_hat_lightspeed/index'
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            Assessing and Monitoring RHEL Resource Optimization with {productNameText} for Red Hat Enterprise Linux
                            <ExternalLinkAltIcon className="pf-v6-u-ml-xs" />
                        </Content>
                    </Flex>
                </Content>
            }
        >
            <Button icon={<OutlinedQuestionCircleIcon/>}
                variant="plain"
                aria-label="Open resource optimization popover"
                style={{ padding: 0 }}
                ouiaId="AboutRosPopover"
            />
        </Popover>
    );
};
