import React from 'react';
import {
    Button,
    Flex,
    Popover,
    Text,
    TextContent,
    TextVariants,
    Title
} from '@patternfly/react-core';
import {
    ExternalLinkAltIcon,
    OutlinedQuestionCircleIcon
} from '@patternfly/react-icons';

export const RosPopover = () => {
    return (
        <Popover
            aria-label="Resource optimization popover"
            headerContent={<Title headingLevel="h4">{'About resource optimization'}</Title>}
            position="right"
            maxWidth="650px"
            bodyContent={
                <TextContent>
                    <Flex direction={{ default: 'column' }}>
                        <Text component={TextVariants.p}>
                        The resource optimization service enables RHEL customers to assess and monitor their public cloud usage and optimization.
                        </Text>
                        <a
                            href={
                                // eslint-disable-next-line max-len
                                'https://docs.redhat.com/en/documentation/red_hat_insights/1-latest/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/index'
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            Assessing and Monitoring RHEL Resource Optimization with Insights for Red Hat Enterprise Linux
                            <ExternalLinkAltIcon className="pf-v5-u-ml-xs" />
                        </a>
                    </Flex>
                </TextContent>
            }
        >
            <Button
                variant="plain"
                aria-label="Open resource optimization popover"
                style={{ padding: 0 }}
                ouiaId="AboutRosPopover"
            >
                <OutlinedQuestionCircleIcon />
            </Button>
        </Popover>
    );
};
