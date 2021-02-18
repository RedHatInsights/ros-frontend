import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/cjs/ReducerRegistry';

const onEntitiesLoaded = (state) => {
    // do some thing with entity
    console.log('------------->>>>..');
    console.log('inside onEntitiesLoaded');
    console.log(state);
    const [name] =
      state?.columns?.filter(
        ({ key }) => key === 'display_name'
      ) || [];
    return {
        ...state,
        columns: [
            name,
            { key: 'version', title: 'Version' }
        ],
        loaded: true
    };
};

export const entityDetailReducer = ({ LOAD_ENTITIES_FULFILLED }) => applyReducerHash({
    [LOAD_ENTITIES_FULFILLED]: onEntitiesLoaded
});
