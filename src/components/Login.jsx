import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { logeInSchema } from "../schema";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const initialValues = {
  emailORphone: "",
  password: "",
};

export default function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated){
      navigate("/")
    }

  }, []);

  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: logeInSchema,
    onSubmit: async (values) => {
      // console.log("valses", values)
      // sessionStorage.setItem("data", values.emailORphone);
      try{
        const res = await axios.post("http://localhost:3000/login", {
        username: values.emailORphone,
        password: values.password
        })
        // console.log("Login.jsx 23 line res: ", res.data.user);

        dispatch(login({ user: res.data.user.username, id: res.data.user._id}));
        navigate("/")

      } catch(err){
        console.log("My api:",err)
      }
    }
  })    
  return (
    <>
    <div className="main-wrapper">

        <h1 className="">Login</h1>

        <Form onSubmit={handleSubmit} method="post">
          <Form.Group className="mb-3 " controlId="emailORphone">
            <Form.Label>Email Or Phone number</Form.Label>
            <Form.Control
              type="tel"
              autoComplete="off"
              placeholder="Enter email or number"
              name="emailORphone"

              value={values.emailORphone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.emailORphone && touched.emailORphone && <p className="error">{errors.emailORphone}</p> }
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && <p className="error">{errors.password}</p> }
          </Form.Group>

          <Form.Group className="mb-3 text-center">
            <Form.Text className="text-muted ">
              Dont have a account? <a href="/register">Register Now</a>
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
    </div>
      
    </>
  );
}
