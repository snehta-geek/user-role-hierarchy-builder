export const getListSuccess =(payload,parent,fieldName,val) =>({
    type: "FETCH_LEAD_MANAGER_LIST_SUCCESS",
    payload: {payload,parent,fieldName,val}
});

export const getManagerDataSuccess =(payload,parent,fieldName,val) =>({
    type: "FETCH_MANAGER_LIST_SUCCESS",
    payload: {payload,parent,fieldName,val}
});

export const resetListData =(parent,fieldName,val) =>({
    type: "RESET_LEAD_MANAGER_LIST",   
    payload: {parent,fieldName,val}
});

export const setFieldValueSuccess =(parent,fieldName, value) =>({
    type: "SET_FIELD_VALUE",
    payload: {parent,fieldName, value}
});
export const setLoginDetails =(fieldName, value) =>({
    type: "SET_LOGIN_FIELD_VALUE",
    payload: {fieldName, value}
});
export const setReportee =(value) =>({
    type: "SET_REPORTEE",
    payload: value
});
export const setSigninCredentials =(fieldName,value) =>({
    type: "SET_SIGNIN_DETAILS",
    payload: {fieldName,value}
});
export const getReporteeListSuccess =(value) =>({
    type: "GET_REPORTEES",
    payload: value
});
