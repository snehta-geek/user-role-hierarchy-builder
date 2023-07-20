import React, { useEffect, useReducer } from 'react'
import { getReporteeReducer } from '../reducer'
import axiosInstance from '../axiosInstance'
import { getReporteeListSuccess } from '../action'

const GetReportees = () => {
    const initState = {
        reporteeList: []
    }

    const [state, dispatch] = useReducer(getReporteeReducer, initState)
    console.log("get-state---", state);
    const getReporteeList = async () => {
        let userId = localStorage.getItem('userId')
        const resp = await axiosInstance.get(`/api/get-reportees/${userId}`)
        console.log("resp---", resp);
        dispatch(getReporteeListSuccess(resp.data))
    }
    useEffect(() => {
        getReporteeList();
    }, [])

    return (
        <>
            {/* {state?.reporteeList &&
                <div key={state.reporteeList.reporteeId}>{state.reporteeList?.managerDetails?.fullName}</div>
            } */}
            <section class="section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            {state?.reporteeList &&
                <div class="candidate-list">
                    <div class="candidate-list-box card mt-4">
                        <div class="p-4 card-body">
                            <div class="align-items-center row">
                                <div class="col-auto">
                                    <div class="candidate-list-images">
                                        <a href="#"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""
                                                class="avatar-md img-thumbnail rounded-circle"  style={{height: 100}}/></a>
                                    </div>
                                </div>
                                <div class="col-lg-5">
                                    <div class="candidate-list-content mt-3 mt-lg-0">
                                        <h5 class="fs-19 mb-0">
                                            <a class="primary-link" key={state.reporteeList.reporteeId}>{state.reporteeList?.reporteeDetails?.fullName}</a><span
                                                class="badge bg-success ms-1"><i
                                                    class="mdi mdi-star align-middle"></i>{state.reporteeList?.reporteeRole}</span>
                                        </h5>                                        
                                        <ul class="list-inline mb-0 text-muted">
                                            <li class="list-inline-item"><i class="mdi mdi-map-marker"></i> {state.reporteeList?.reporteeDetails?.email}</li>
                                            <li class="list-inline-item"><i class="mdi mdi-wallet"></i> {state.reporteeList?.reporteeDetails?.mobileNumber}
                                            </li>
                                        </ul>
                                    </div>
                                </div>                                
                            </div>
                            <div class="favorite-icon">
                                <a href="#"><i class="mdi mdi-heart fs-18"></i></a>
                            </div>
                        </div>
                    </div>

                </div>
}
            </div>
        </div>
    </div>
</section>
        </>
    )
}

export default GetReportees