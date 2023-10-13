import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { registrationSchema } from "../schema";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const initialValues = {
  emailORphone: "",
  password: "",
  confirmPassword: "",
};

export default function Registration() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated){
      navigate("/")
    }
  }, []);

  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registrationSchema,
      onSubmit: async (values) => {

        try{
          const res = await axios.post("http://localhost:3000/register", {
          emailOrPhone: values.emailORphone,
          password: values.password
          })

          dispatch(login({ user: res.data.username}));
          navigate("/")
        } catch(err){
          console.log(err)
        }
      },
    });
  return (
    <>
      
        <h1 className="text-center">Register</h1>

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
            {errors.emailORphone && touched.emailORphone && (
              <p className="error">{errors.emailORphone}</p>
            )}
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
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Conform password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Conform Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3 text-center">
            <Form.Text className="text-muted">
              Already have a account? <a href="/login">Login Now</a>
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
   
    </>
  );
}
