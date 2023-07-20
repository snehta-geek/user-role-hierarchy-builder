export const signupReducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_LEAD_MANAGER_LIST_SUCCESS':
            console.log("red--::--",action.payload);

            return{
                ...state,
                [action.payload.parent] : {
                        ...state[action.payload.parent],
                        [action.payload.fieldName]: action.payload.val
                    },
                getLeads : action.payload.payload[0].data,
                getManagers : action.payload.payload[1].data
            }
            case 'FETCH_MANAGER_LIST_SUCCESS':
                console.log("red----",action.payload);
                return{
                    ...state,
                    [action.payload.parent] : {
                        ...state[action.payload.parent],
                        [action.payload.fieldName]: action.payload.val
                    },
                     getManagers : action.payload.payload.data
                }
                case 'RESET_LEAD_MANAGER_LIST':
                    return{
                        ...state,
                        [action.payload.parent] : {
                            ...state[action.payload.parent],
                            [action.payload.fieldName]: action.payload.val
                        },
                        getLeads:[],
                        getManagers : []
                    }
                case 'SET_FIELD_VALUE':
                    console.log("ac--",action.payload.fieldName,action.payload.value);
                    return{
                        ...state,   
                        [action.payload.parent] : {
                            ...state[action.payload.parent],
                            [action.payload.fieldName]: action.payload.value
                        }                     
                        
                    }
                    case 'SET_LOGIN_FIELD_VALUE':
                        return{
                            ...state,
                            [action.payload.fieldName] : action.payload.value
                        } 
                    case 'SET_REPORTEE':
                        console.log("reepor----",action.payload);
                        return{
                            ...state,
                            reporteeId: action.payload
                        }
            default:
                return state;
            
    }

}

export const signinReducer = (state,action) =>{
    switch(action.type){
        case 'SET_SIGNIN_DETAILS':
            console.log("action--",action);

            return{
                ...state,
                [action.payload.fieldName] : action.payload.value
            }
        default:
            return state
    }
}

export const getReporteeReducer = (state,action) =>{
    switch(action.type){
        case 'GET_REPORTEES':
            console.log("action--",action);
            return{
                ...state,
                reporteeList : action.payload
            }
        default:
            return state
    }
}