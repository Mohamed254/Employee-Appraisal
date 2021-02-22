import React, { Fragment, useContext, useEffect } from "react";

import Spinner from './layout/Spinner'
import AppraisalContext from "../../context/appraisal/appraisalContext";
import UserContext from "../../context/user/userContext"; 

const Contents = (props) => {
  const userContext = useContext(UserContext);  

  const appraisalContext = useContext(AppraisalContext);

  const { loadappraisal} = appraisalContext;

  const { isAuthenticated, loading } = userContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Feedback");
    }

    // setCurrent(user.data);
    //loading all appraisal
    loadappraisal();
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
