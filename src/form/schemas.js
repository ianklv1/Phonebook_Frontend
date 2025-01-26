import * as yup from 'yup'

export const SignUpValidation = yup.object().shape({
  username: yup
    .string()
    .required('Username is a required field')
    .matches(/^[A-Za-z0-9]+$/, 'Username can only contain letters and numbers')
    .max(15, 'Username must be at most 15 characters'),
  password: yup.string().required('Password is a required field').max(50, 'Password must be at most 50 characters'),
  firstName: yup
    .string()
    .required('First Name is a required field')
    .matches(/^[A-Za-z ]+$/, 'Username can only contain letters')
    .max(25, 'Username must be at most 25 characters'),
  lastName: yup
    .string()
    .required('Last Name is a required field')
    .matches(/^[A-Za-z ]+$/, 'Username can only contain letters')
    .max(25, 'Username must be at most 25 characters'),
  emailAddress: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field')
    .max(50, 'Email must be at most 50 characters'),
  contactNumber: yup
    .string()
    .matches(
      /^(09\d{9}|\+639\d{9}|(?:\+63|0)(2|3[2-8]|4[2-8]|5[2-8]|6[2-8]|7[2-8]|8[2-8]|9[2-8])\d{7})$/,
      'Contact number must be a valid Philippine mobile or landline number'
    )
    .required('Contact number is required')
})

export const UpdateValidation = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is a required field')
    .matches(/^[A-Za-z ]+$/, 'Username can only contain letters')
    .max(25, 'Username must be at most 25 characters'),
  lastName: yup
    .string()
    .required('Last Name is a required field')
    .matches(/^[A-Za-z ]+$/, 'Username can only contain letters')
    .max(25, 'Username must be at most 25 characters'),
  emailAddress: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field')
    .max(50, 'Email must be at most 50 characters'),
  contactNumber: yup
    .string()
    .matches(
      /^(09\d{9}|\+639\d{9}|(?:\+63|0)(2|3[2-8]|4[2-8]|5[2-8]|6[2-8]|7[2-8]|8[2-8]|9[2-8])\d{7})$/,
      'Contact number must be a valid Philippine mobile or landline number'
    )
    .required('Contact number is required')
})

export const ForgotPasswordValidation = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field')
    .max(50, 'Email must be at most 50 characters')
})

export const ResetPasswordValidation = yup.object().shape({
  password: yup.string().required('Password is a required field').max(50, 'Password must be at most 50 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is a required field')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})
