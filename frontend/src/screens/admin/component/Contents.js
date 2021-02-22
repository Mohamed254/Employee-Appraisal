import React, { Fragment, useContext, useEffect } from "react";

import Spinner from './layout/Spinner'
import AppraisalContext from "../../../context/appraisal/appraisalContext";
import AuthContext from "../../admin/context/auth/authContext"; 
import UpdateAppraisal from "./pages/EditAppraisal";
// import { GET_USERS } from "../../context/types";
const Contents = (props) => {
  const authContext = useContext(AuthContext);  

  const appraisalContext = useContext(AppraisalContext);

  const { getAppraisals } = appraisalContext;

  const { isAuthenticated, loading } = authContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Appraisals");
    }
    //loading all appraisal
    getAppraisals();

    // updateAppraisal();
    //get all users users

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
    
      {/* <!-- cards --> */}
      
      {/* <!-- end of cards --> */}
    </Fragment>
  );
};

export default Contents;
