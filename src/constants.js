import { LockIcon } from '@patternfly/react-icons';

export const propsForAccessDenied = {
    icon: LockIcon,
    color: '#6a6e73',
    title: 'You do not have access to Systems',
    text: ['Contact your organization administrator(s) for more information.']
};

export const ROS_API_ROOT = '/api/ros/v0';
export const SYSTEMS_API_ROOT = '/systems';
export const RECOMMENDATION_RATING_API = '/rating';
export const NEGATIVE_FEEDBACK = -1;
export const NEUTRAL_FEEDBACK = 0;
export const POSITIVE_FEEDBACK = 1;
