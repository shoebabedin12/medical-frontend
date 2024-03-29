import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoctorValidation } from "../validation";

const EditDoctor = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const live = process.env.REACT_APP_LOCAL;
  const params = useParams();
  const [allUser, setAllUser] = useState([]);
  const [filterUser, setFilterUser] = useState();
  const [degrees, setDegrees] = useState([{ degree: "", specialized: "" }]);
  const addNewDegree = () => {
    setDegrees([...degrees, { degree: "", specialized: "" }]);
  };


  useEffect(() => {
    if (filterUser) {
      setDegrees(filterUser.degrees || [{ degree: "", specialized: "" }]);
    }
  }, [filterUser]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const allData = await axios.get(`${apiKey}/user/all-doctors`);
        setAllUser(allData.data);
      } catch (error) {
        console.error("Error while fetching pending requests:", error);
      }
    };

    getAllData();
  }, [apiKey]);

  useEffect(() => {
    const filterData = allUser.find((user) => user._id === params.id);
    setFilterUser(filterData);
  }, [params.id, allUser]);

  const handleDegreeChange = (index, fieldName, value) => {
    const updatedDegrees = [...degrees];
    updatedDegrees[index][fieldName] = value;
    setDegrees(updatedDegrees);

    // Update Formik's state for the changed degree
    formik.setFieldValue(`degrees[${index}].${fieldName}`, value);
  };

  const removeDegree = (index) => {
    const updatedDegrees = [...degrees];
    updatedDegrees.splice(index, 1);
    setDegrees(updatedDegrees);
    // Remove the degree from Formik's state
    formik.setFieldValue(
      "degrees",
      formik.values.degrees.filter((_, i) => i !== index)
    );
  };

  const EditDoctor = async () => {
    console.log("Entering editDoctor function");
    const formData = new FormData();

    formData.append("id", params.id);
    formData.append("name", formik.values.name);
    formData.append("email", formik.values.email);
    formData.append("phone", formik.values.phone);
    formData.append("h_name", formik.values.h_name);
    formData.append("position", formik.values.position);
    formData.append("bmdcRegNo", formik.values.bmdcRegNo);

    // Append the image files
    formData.append("profile_img", formik.values.profile_img);
    formData.append("doctor_sign", formik.values.doctor_sign);

    // Append the degrees as a JSON string
    formData.append("degrees", JSON.stringify(formik.values.degrees));

    try {
      let { data } = await axios.post(
        `${apiKey}/user/doctor-update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      toast(data.error);
      toast(data.success);
      if (data.success) {
        window.location.replace("/doctor-list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: filterUser?.name || "",
      email: filterUser?.email || "",
      phone: filterUser?.phone || "",
      h_name: filterUser?.h_name || "",
      position: filterUser?.position || "",
      bmdcRegNo: filterUser?.bmdcRegNo || "",
      profile_img: filterUser?.profile_img || "",
      doctor_sign: filterUser?.doctor_sign || "",
      degrees: filterUser?.degrees || [{ degree: "", specialized: "" }]
    },
    validationSchema: addDoctorValidation,
    onSubmit: async () => {
      try {
        await EditDoctor();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  });


  // For profile_img
const onChangeProfileImage = (e) => {
  formik.setFieldValue("profile_img", e.target.files[0]);
  formik.setFieldError("profile_img", "");
}

// For doctor_sign
const onChangeDoctorSign = (e) => {
  formik.setFieldValue("doctor_sign", e.target.files[0]);
  formik.setFieldError("doctor_sign", "");
}

  return (
    <>
      <div className="add-new-report">
        <div className="report-body">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="profile-heading">Edit Doctor</h2>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="u_name"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      User Name *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="name"
                        type="text"
                        className="form-control"
                        id="u_name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <p>{formik.errors.name}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="email"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Email *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="example@email.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />

                      {formik.touched.email && formik.errors.email ? (
                        <p>{formik.errors.email}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="phone"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Phone No
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="phone"
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <p>{formik.errors.phone}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="profile_img"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Profile Image
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        name="profile_img"
                        type="file"
                        className="form-control mb-4"
                        id="profile_img"
                        onChange={onChangeProfileImage}
                      />
                      {formik.values.profile_img ? (
                        <img
                          className="img-fluid w-responsive"
                          src={
                            formik.values.profile_img instanceof File
                              ? URL.createObjectURL(formik.values.profile_img)
                              : `${live}/${formik.values.profile_img
                                  .replace(/\\/g, "/")
                                  .replace(/\.[^/.]+$/, "")}`
                          }
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        <p>No Image found</p>
                      )}

                      {formik.touched.profile_img &&
                      formik.errors.profile_img ? (
                        <p>{formik.errors.profile_img}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="h_name"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Hospital *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="h_name"
                        type="text"
                        className="form-control"
                        id="h_name"
                        value={formik.values.h_name}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.h_name && formik.errors.h_name ? (
                        <p>{formik.errors.h_name}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="position"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Position *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="position"
                        type="text"
                        className="form-control"
                        id="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.position && formik.errors.position ? (
                        <p>{formik.errors.position}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="regNo"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      BMDC Reg No *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="bmdcRegNo"
                        type="text"
                        className="form-control"
                        id="regNo"
                        value={formik.values.bmdcRegNo}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.bmdcRegNo && formik.errors.bmdcRegNo ? (
                        <p>{formik.errors.bmdcRegNo}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="doctor_sign"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Dotor's Sign
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        name="doctor_sign"
                        type="file"
                        className="form-control mb-4"
                        id="doctor_sign"
                        onChange={onChangeDoctorSign}
                      />
                      {formik.values.doctor_sign ? (
                        <img
                          className="img-fluid w-responsive"
                          src={
                            formik.values.doctor_sign instanceof File
                              ? URL.createObjectURL(formik.values.doctor_sign)
                              : `${live}/${formik.values.doctor_sign
                                  .replace(/\\/g, "/")
                                  .replace(/\.[^/.]+$/, "")}`
                          }
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        <p>No Image found</p>
                      )}
                      {formik.touched.doctor_sign &&
                      formik.errors.doctor_sign ? (
                        <p>{formik.errors.doctor_sign}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-12 profile-btn">
                  <span className="btn btn-warning mb-3" onClick={addNewDegree}>
                    Add Degree
                  </span>
                  <div className="">
                    {degrees.map((degree, index) => (
                      <div key={index} className="row mb-3">
                        <div className="col-12 col-lg-5">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <input
                              required
                              name={`degree-${index}`}
                              type="text"
                              className="form-control"
                              placeholder="Degree"
                              value={degree.degree}
                              onChange={(e) =>
                                handleDegreeChange(
                                  index,
                                  "degree",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <input
                              required
                              name={`specialized-${index}`}
                              type="text"
                              className="form-control"
                              placeholder="Specialization"
                              value={degree.specialized}
                              onChange={(e) =>
                                handleDegreeChange(
                                  index,
                                  "specialized",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-1">
                          <button
                            className="btn btn-danger"
                            onClick={() => removeDegree(index)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex profile-btn">
                    <button
                      onClick={() => window.history.back()}
                      className="btn cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn update"
                      onClick={() => EditDoctor()}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDoctor;
