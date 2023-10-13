import * as Yup from 'yup'

export const logeInSchema = Yup.object({
    emailORphone: Yup.string().test(
        'emailOrPhoneNumber',
        'Invalid input. It should be an email or a 10-digit phone number',
        function (value) {
          if (value) {
            // Define a regular expression to match a valid email address
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            
            // Define a regular expression to match a 10-digit phone number
            const phoneRegex = /^\d{10}$/;
      
            // Check if the input matches either the email or phone number regex
            if (emailRegex.test(value) || phoneRegex.test(value)) {
              return true; // Validation succeeded
            }
          }
      
          return false; // Validation failed
        }
      )
    .required('Input is required'),
    password: Yup.string().min(6).required("Please enter your password"),
    
})

export const registrationSchema = Yup.object({
    emailORphone: Yup.string().test(
        'emailOrPhoneNumber',
        'Invalid input. It should be an email or a 10-digit phone number',
        function (value) {
          if (value) {
            // Define a regular expression to match a valid email address
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            
            // Define a regular expression to match a 10-digit phone number
            const phoneRegex = /^\d{10}$/;
      
            // Check if the input matches either the email or phone number regex
            if (emailRegex.test(value) || phoneRegex.test(value)) {
              return true; // Validation succeeded
            }
          }
      
          return false; // Validation failed
        }
      )
    .required('Input is required'),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], "Password must match")
})

export const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  description: Yup.string().required('Description is required'),

});