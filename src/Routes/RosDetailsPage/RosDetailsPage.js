import React from 'react';
import { withRouter } from 'react-router-dom';

import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Unavailable } from '@redhat-cloud-services/frontend-components/Unavailable';

const RosDetailsPage = () => {
    return (
        <Main>
            <Unavailable/>
        </Main>
    );
};

export default withRouter(RosDetailsPage);
