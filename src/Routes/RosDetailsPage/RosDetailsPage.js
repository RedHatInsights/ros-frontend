import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
//import { fetchRosDetails } from '../../Components/RosTable/redux/actions';
//import { useSelector } from 'react-redux';

const RosDetailsPage = () => {
    const { inventoryId } = useParams();
    //const displayName = useSelector(
    //    ({ entityDetails }) => entityDetails?.entity?.display_name
    //);
    // do we need a Reducer similar to groupsDetailReducer for entity ?

    useEffect(() => {
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('system-detail');
    }, []);

    useEffect(() => {
        insights?.chrome?.appObjectId?.(inventoryId);
    }, [inventoryId]);

    return (
        <div>
            <h1> Hello React!! </h1>
        </div>
    );
};

export default withRouter(RosDetailsPage);
