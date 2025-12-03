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
import { GETTING_STARTED_DOC } from '../../constants';

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
                            href={GETTING_STARTED_DOC}
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
