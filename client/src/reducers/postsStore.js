const postsStore = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.data;
        case 'CREATE':
            return [...posts, action.data];
        case 'UPADTE':
        case 'LIKE':
            return posts.map((post) => (post._id === action.updatedData._id ? action.updatedData : post));
        case 'DELETE':
            return posts.filter((post) => (post._id !== action.id));
        default:
            return posts
    }
}
export default postsStore;