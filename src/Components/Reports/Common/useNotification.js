import { useDispatch } from 'react-redux';
import {
    addNotification as addNotificationFEC,
    clearNotifications as clearNotificationsFEC
} from '@redhat-cloud-services/frontend-components-notifications/redux';

export const useNotification = () => {
    const dispatch = useDispatch();

    const addNotification = (config) =>
        dispatch(
            addNotificationFEC(config)
        );

    const clearNotifications = () =>
        dispatch(clearNotificationsFEC());

    return [addNotification, clearNotifications];
};
