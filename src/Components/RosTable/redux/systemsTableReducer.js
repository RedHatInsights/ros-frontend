const initialState = {
    loading: false,
    systemsData: [],
    systemError: {}
};

const systemsTableReducer = () => {
    const tableReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'FETCH_CLOUD_SYSTEMS_LIST_PENDING':
                return {
                    ...state,
                    loading: true
                };
            case 'FETCH_CLOUD_SYSTEMS_LIST_FULFILLED':
                return {
                    ...state,
                    loading: false,
                    systemsData: action.payload
                };
            case 'FETCH_CLOUD_SYSTEMS_LIST_REJECTED':
                return {
                    ...state,
                    loading: false,
                    systemError: action.payload
                };
            default:
                return state;
        }
    };

    return tableReducer;
};

export default systemsTableReducer;
