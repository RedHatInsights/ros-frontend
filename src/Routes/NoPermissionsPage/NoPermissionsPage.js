import React from 'react';
import { withRouter } from 'react-router-dom';

import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';

const NoPermissionsPage = () => {
    return (
        <Main>
            <NotAuthorized serviceName='Sample app'/>
        </Main>
    );
};

export default withRouter(NoPermissionsPage);
