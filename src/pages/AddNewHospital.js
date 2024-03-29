import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { toast } from "react-toastify";
import { addHospitalValidation } from "../validation";

const AddNewHospital = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [view, setView] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    map_location: "",
    hospital_img: null
  };

  const addNewHospital = async () => {
    const formData = new FormData();

    formData.append("name", formik.values.name);
    formData.append("email", formik.values.email);
    formData.append("password", formik.values.password);
    formData.append("phone", formik.values.phone);
    formData.append("address", formik.values.address);
    formData.append("map_location", formik.values.map_location);
    formData.append("hospital_img", formik.values.hospital_img);

    try {
      let { data } = await axios.post(
        `${apiKey}/user/new-hospital-add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(data);
      toast(data.error);
      toast(data.success);
      if (data.success) {
        window.location.replace("/hospital-list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addHospitalValidation,
    onSubmit: async () => {
      try {
        await addNewHospital();
      } catch (error) {
        console.error(error);
      }
    }
  });
  return (
    <>
      <div className="add-new-report">
        <div className="report-body">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="profile-heading">Add New Hospital</h2>
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
                      htmlFor="password"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Password *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12 position-relative">
                      <input
                        required
                        name="password"
                        type={view ? "text" : "password"}
                        className="form-control"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      <button
                        onClick={() => setView(!view)}
                        className="position-absolute top-50 end-0 translate-middle border-0 bg-transparent "
                        style={{ cursor: "pointer" }}
                      >
                        {view ? <GrFormView /> : <GrFormViewHide />}
                      </button>
                      {formik.touched.password && formik.errors.password ? (
                        <p>{formik.errors.password}</p>
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
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="h_name"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Address *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="address"
                        type="text"
                        className="form-control"
                        id="h_name"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <p>{formik.errors.address}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-1 mb-lg-3 row">
                    <label
                      htmlFor="position"
                      className="col-sm-12 col-md-12 col-lg-12 col-form-label"
                    >
                      Map Location *
                    </label>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <input
                        required
                        name="map_location"
                        type="text"
                        className="form-control"
                        id="position"
                        value={formik.values.map_location}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.map_location &&
                      formik.errors.map_location ? (
                        <p>{formik.errors.map_location}</p>
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
                        required
                        name="profile_img"
                        type="file"
                        className="form-control"
                        id="profile_img"
                        onChange={(e) =>
                          formik.setFieldValue(
                            "hospital_img",
                            e.target.files[0]
                          )
                        }
                      />
                      {formik.touched.hospital_img &&
                      formik.errors.hospital_img ? (
                        <p>{formik.errors.hospital_img}</p>
                      ) : null}
                    </div>
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
                    <button type="submit" className="btn update">
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

export default AddNewHospital;
