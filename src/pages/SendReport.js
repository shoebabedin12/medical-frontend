import React from "react";
import { Link } from "react-router-dom";

const SendReport = () => {
  return (
    <>
      <div className="add-new-report">
        <div className="report-body">
          <h2 className="profile-heading">Sent Reports</h2>
          <div className="data-table-filter">
            <div className="row">
              <div className="col-lg-4">
                <div className="mb-5 row">
                  <label for="h-name" className="col-sm-12 col-form-label">
                    Search Report
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="password"
                      className="form-control search"
                      id="h-name"
                      placeholder="Search Report"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-5 row">
                  <label for="h-name" className="col-sm-12 col-form-label">
                    By Doctor
                  </label>
                  <div className="col-sm-12">
                    <select
                      id="disabledSelect"
                      className="form-select custom_input"
                    >
                      <option selected>Select One</option>
                      <option value="hospital">Male</option>
                      <option value="doctor">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-5 row">
                  <label for="h-name" className="col-sm-12 col-form-label">
                    By Date
                  </label>
                  <div className="col-sm-12 position-relative">
                    <input
                      type="date"
                      className="form-control date"
                      id="h-name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table
            id="example"
            className="cell-border table-responsive w-100"
          >
            <thead className="">
              <tr>
                <th className="">
                  <span className="">Report ID</span>
                </th>
                <th className="">
                  <span className="">Patient Name</span>
                </th>
                <th className="">
                  <span className="">Department</span>
                </th>
                <th className="">
                  <span className="">Prefered Doctor</span>
                </th>
                <th className="">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>RID011</span>
                </td>
                <td>
                  <span>Miss. Jahanara Begum</span>
                </td>
                <td>
                  <span>Dept. of Radiology & Imaging</span>
                </td>
                <td>
                  <span>Dr. Monjurul Alam</span>
                </td>
                <td>
                  <Link to="/edit-report">
                    <img src={require('./../assets/images/edit.png')} className="img-fluid" alt="" />
                  </Link>
                  <Link
                    data-bs-toggle="modal"
                    to="#exampleModalToggle"
                    role="button"
                  >
                  <img src={require('./../assets/images/delete-button.png')} className="img-fluid" alt="" />
                  </Link>
                </td>
              </tr>
            
            
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SendReport;
