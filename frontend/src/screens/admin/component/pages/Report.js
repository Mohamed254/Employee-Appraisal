import React, { useRef, Fragment, useContext, useEffect } from 'react';
import ReactToPrint from 'react-to-print';


import AppraisalsContext from "../../context/appraisal/appraisalsContext";
// import UserContext from "../../../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
 
const Report = (props) => {

  const appraisalsContext = useContext(AppraisalsContext);
  const authContext = useContext(AuthContext);
  // const userContext = useContext(UserContext);

  // const { user } = userContext;

  const { isAuthenticated } = authContext;

  const { getAppraisals, appraisals,    } = appraisalsContext;

  

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/Appraisals");
    }
    //loading all appraisal
    getAppraisals();
    //get all users users
    
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);




  const componentRef = useRef();


    class ComponentToPrint extends React.PureComponent {
    render() {
      return (
        
        <table className='table'>
          <thead>APPRAISALS</thead>
                        
        <thead>
          <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Communication Skills</th>
            <th scope="col">Problem Solving</th>
            
            <th scope="col">Overall Score</th>
            <th scope="col">Status</th>
          
            
          </tr>
        </thead>

        <tbody>
          { appraisals && appraisals.map((appraisal) =>  (
            
            <Fragment>
              
              <tr key={appraisal._id}> 
                <td>{appraisal.user}</td>
                <td>{appraisal.Communication_Skills}</td>
                <td>{appraisal.Problem_solving}</td>
                
                <td>{appraisal.Overall_Score}</td>
                <td>{appraisal.Status}</td>
                

                
              </tr>
            </Fragment> 
          ))}
        
        </tbody>
      </table>
      );
    }
  }
 
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div style={{display: 'none'}}>
      <ComponentToPrint ref={componentRef} />
      </div>
      
    </div>
  );
};

export default Report;