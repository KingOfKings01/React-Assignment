import axios from "axios";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { validationSchema } from "../schema";
import { useState } from "react";

import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";




const AddProduct = () => {
  const [attributes, setAttributes] = useState([
    {
      name: "",
      value: "",
    },
  ]);
  const [imageUpload, setImageUpload] = useState();
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    price: "",
    description: "",
  };

  //! Firebase
// const imageListRef = ref(storage, "images/");
const uploadImage = async (imageUpload) => {
  if (imageUpload == null) return;
 
    const imageRef = ref(storage, "images/" + imageUpload.name + v4());
    // Uploading
    try{
      const snapshot = await uploadBytes(imageRef, imageUpload)
      const url = await getDownloadURL(snapshot.ref)
      return url    
    } catch (err){
      return "Not working"
    }
};

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        // console.log("AddProduct.jsx line:38 -> ", values, imageUpload, attributes);
 
          try{
            if(! imageUpload) {console.log("No image")}

            const imgUrl = await uploadImage(imageUpload)
            const Data = {...values, imageUrl: imgUrl, attributes}
            
            await axios.post("http://localhost:3000/addProduct", Data )
            navigate("/")
            
          } catch(err){
            console.log(err)
          }
      },
    });

  return (
    <div>
      <h1>Add Product</h1>
      <Form onSubmit={handleSubmit} action="/upload" method="POST" encType="multipart/form-data">
        <Form.Group className="mb-3 " controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="tel"
            autoComplete="off"
            placeholder="Product name"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.title && touched.title && (
            <p className="error">{errors.title}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.price && touched.price && (
            <p className="error">{errors.price}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          // setImageUpload(URL.createObjectURL(event.target.files[0]))
        }}
      />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && touched.description && (
            <p className="error">{errors.description}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="attributes">
          <div className="d-flex justify-content-between mb-2">
            <Form.Label>Attributes</Form.Label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setAttributes((prevState) => [
                  ...prevState,
                  { name: "", value: "" },
                ]);
              }}
            >
              Add more attributes
            </Button>
          </div>
          {attributes.map((attribute, index) => (
            <div key={index} className="d-flex gap-2 mb-3">
              <Form.Control
                type="text"
                placeholder="Attribute name"
                name={`attributes[${index}].name`}
                value={attribute.name}
                onChange={(e) => {
                  const newAttributes = [...attributes];
                  newAttributes[index].name = e.target.value;
                  setAttributes(newAttributes);
                }}
              />

              <Form.Control
                type="text"
                placeholder="Attribute value"
                name={`attributes[${index}].value`}
                value={attribute.value}
                onChange={(e) => {
                  const newAttributes = [...attributes];
                  newAttributes[index].value = e.target.value;
                  setAttributes(newAttributes);
                }}
              />
            </div>
          ))}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
