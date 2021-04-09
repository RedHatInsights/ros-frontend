import React, { Suspense } from 'react';
const SystemRecommendations = React.lazy(() => import('./SystemRecommendations'));

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */

const SystemDetail = () => (
    <Suspense fallback="">
        <SystemRecommendations/>
    </Suspense>
);

export default SystemDetail;
