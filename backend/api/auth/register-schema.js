const yup = require('yup')

module.exports = yup.object().shape({
  email: yup
    .string('Invalid email')
    .email('Invalid email')
    .required('Email is required'),
  username: yup
    .string('Invalid username')
    .required('Username is required')
    .min(3, 'Username must be longer than 3 characters')
    .max(20, "Username can't be longer than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]*$/g,
      'Username can only contain letters, digits and underscores'
    ),
  password: yup
    .string('Invalid password')
    .required('Password is required')
    .min(3, 'Password must be longer than 3 characters')
    .max(20, "Password can't be longer than 20 characters"),
  discord: yup
    .string('Invalid discord username')
    .required('Discord username is required')
    .matches(/^[^@#:]*#\d{4}$/gu, 'Invalid discord username')
    .matches(/^((?!```).)*$/gu, 'Invalid discord username')
    .notOneOf(['everyone', 'discordtag', 'here'], 'Invalid discord username'),
  edu: yup.string('Invalid educational innstitution'),
  name: yup
    .string('Invalid name')
    .min(3, 'Name must be over 3 characters')
    .max(255, 'Name must be less than 255 characters'),
})
