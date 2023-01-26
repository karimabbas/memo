import * as api from "../api/index";

export const signup = (formData,navigate) => {
    return async dispatch => {
        const response = await api.signUp(formData);
        const data = response.data
        dispatch({
            type: "AUTH",
            data
        });
    }
};

export const signin = (formData,navigate) => async (dispatch) => {
    try {
        const response = await api.signIn(formData);
        const data = response.data
        dispatch({
            type: "AUTH",
            data
        });
    } catch (error) {
        console.log(error);
    }
};