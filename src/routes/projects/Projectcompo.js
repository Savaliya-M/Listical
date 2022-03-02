import React from "react";
import "./projectcompo.css";


const Projectcompo = () => {
    return (
        <>
            <div>
                <div className="mainprojectcompo" id="Projectdetail">
                    <div className="probox">
                        <div className="progressreport">
                            <img src={require('@photos/peichart.jpg')}  alt="this is pie chart" />
                        </div>
                        <div className="proinfo">
                            <div className="proname">
                                <h3>Project Name:</h3>
                                <h3>LMS</h3>
                            </div>
                            <div className="clientname">
                                <h4>Client Name:</h4>
                                <h4>chimanbhai mehata </h4>
                            </div>
                            <div className="deadline">
                                <h4>Deadline:</h4>
                                <h4>13/02/2022</h4>
                            </div>
                            <div className="managername">
                                <h4>Manager Name:</h4>
                                <h4>Shyam lal</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projectcompo;
