export const updateColor = (state = '#cccccc', action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.payload;
        default:
            return state;
    }
}