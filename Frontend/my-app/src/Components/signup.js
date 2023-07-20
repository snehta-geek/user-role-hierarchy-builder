import React, { useReducer } from 'react'
import { signupReducer } from '../reducer'
import axiosInstance from '../axiosInstance'
import { getLeadDataSuccess, getListSuccess, getManagerDataSuccess, resetListData, setFieldValueSuccess, setLoginDetails, setReportee } from '../action'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Signup = () => {
    const initalState = {
        username: '',
        password: '',
        personalDetails: {
            fullName: '',
            email: '',
            mobileNumber: ''
        },
        userRole: {
            roleName: ''
        },
        reporteeId: null,
        getLeads: [],
        getManagers: []
    }

    const [state, dispatch] = useReducer(signupReducer, initalState)
    const formSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username: state.username,
            password: state.password,
            personalDetails: {
                fullName: state.personalDetails.fullName,
                email: state.personalDetails.email,
                mobileNumber: state.personalDetails.mobileNumber
            },
            userRole: {
                roleName: state.userRole.roleName
            },
            reporteeId: state.reporteeId
        }
        const signupRes = await axiosInstance.post('/api/signup', payload);
        console.log("signupRes---", signupRes);
        if (signupRes) {
            toast.success("User is Added Successfully!!!");

        }
        else {
            toast.error("Failed to create user");
        }

    }

    const getManagerNleadList = async (e, val) => {
        const [parent, property] = e.target.name.split(".")
        if (val === 'Developer') {
            initalState.userRole.roleName = val;
            console.log("initalState.userRole.roleName---", initalState.userRole.roleName);
            const getLists = await Promise.all([
                axiosInstance.get('/api/get-leads'),
                axiosInstance.get('/api/get-managers')
            ])

            console.log("getLists::----", getLists);
            dispatch(getListSuccess(getLists, parent, property, val))
        }
        else if (val === 'Lead') {
            initalState.userRole.roleName = val;
            const getLeadsResp = await axiosInstance.get('/api/get-managers');
            dispatch(getManagerDataSuccess(getLeadsResp, parent, property, val))

        }
        else {
            dispatch(resetListData(parent, property, val))
        }


    }
    console.log("comp-state0---", state);
    const onSelectedUserRole = (name, val) => {
        console.log("val---", name, val);
        getManagerNleadList(name, val)
    }

    const setFieldValue = (e, type) => {
        const { name, value } = e.target

        if (type) {
            dispatch(setLoginDetails(name, value))
        }
        else {
            const [parent, property] = name.split(".")
            dispatch(setFieldValueSuccess(parent, property, value))
        }

    }
    const selectReportee = (e) => {
        dispatch(setReportee(e.target.value))

    }

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4" onSubmit={formSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0" >
                                                        <input type="text" id="name" className="form-control form-label" name="personalDetails.fullName" placeholder='Full Name'
                                                            onChange={setFieldValue} style={{ border: '1px solid #dbd7d7' }} />
                                                        {/* <label className="form-check-label" htmlFor="name">Full Name</label> */}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0" >
                                                        <input type="email" id="email" className="form-label form-control" name='personalDetails.email' placeholder='Email'
                                                            onChange={setFieldValue} style={{ border: '1px solid #dbd7d7' }} />
                                                        {/* <label className="form-label" htmlFor="email">Email</label> */}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0" >
                                                        <input type="text" id="form3Example1c" className="form-control form-label" name="personalDetails.mobileNumber" placeholder='Mobile Number'
                                                            value={state.personalDetails.mobileNumber} onChange={(e) => setFieldValue(e)} style={{ border: '1px solid #dbd7d7' }} />
                                                        {/* <label className="form-label">Mobile Number</label> */}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0" >
                                                        <input type="text" id="form3Example1c" className="form-label form-control" name="username" placeholder='User Name'
                                                            value={state.username} onChange={(e) => setFieldValue(e, "loginDetails")} style={{ border: '1px solid #dbd7d7' }} />
                                                        {/* <label className="form-label" for="form3Example1c">User Name</label> */}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control form-label" name="password" placeholder='password'
                                                            value={state.password} onChange={(e) => setFieldValue(e, "loginDetails")} style={{ border: '1px solid #dbd7d7' }} />
                                                        {/* <label className="form-label" for="form3Example4c">Password</label> */}
                                                    </div>
                                                </div>

                                                {/* <div class="col-md-6 mb-4"> */}
                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>

                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="userRole.roleName"
                                                            value="Manager" id="Manager" onClick={(e) => onSelectedUserRole(e, "Manager")} />
                                                        {/* checked={initalState.userRole.roleName === 'Manager'} */}

                                                        <label class="form-check-label" htmlFor="Manager">Manager</label>
                                                    </div>

                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="userRole.roleName"
                                                            value="Lead" id="Lead" onClick={(e) => onSelectedUserRole(e, "Lead")} />

                                                        <label class="form-check-label" htmlFor="Lead">Lead</label>
                                                    </div>

                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="userRole.roleName"
                                                            value="Developer" id="Developer" onChange={(e) => onSelectedUserRole(e, "Developer")} />
                                                        <label class="form-check-label" htmlFor="Developer">Developer</label>
                                                    </div>
                                                    {/* checked={initalState.userRole.roleName === 'Developer'} */}
                                                </div>

                                                <div class="row">
                                                    {state?.getManagers?.length > 0 &&
                                                        <div class="col-md-6 mb-4">

                                                            <select class="select" onChange={selectReportee} value={state.reporteeId}>
                                                                <option value="null">Managers</option>
                                                                {state.getManagers?.map(manager => (
                                                                    <option value={manager._id}>{manager.personalDetails.fullName}</option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                    }


                                                    {state?.getLeads?.length > 0 &&
                                                        <div class="col-md-6 mb-4">

                                                            <select class="select" onChange={selectReportee} value={state.reporteeId}>
                                                                <option value="null">Leads</option>

                                                                {state.getLeads?.map(lead => (
                                                                    <option value={lead._id}>{lead.personalDetails?.fullName}</option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                    }

                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required />
                                                    <label className="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                        
                                    </div>
                                    <div class="text-center text-lg-start pt-2 ">                                            
                                            <p class="small fw-bold pt-1 mb-0">Already have an account? <Link to="/signin"
                                                class="link-danger">Sign In</Link></p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default Signup