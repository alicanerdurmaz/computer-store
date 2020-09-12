export const AuthDto = {
  'Log in': {
    email: {
      required: 'Email cannot be empty',
    },
    password: {
      required: 'Password cannot be empty',
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      maxLength: { value: 20, message: 'Password can be maximum of 20 characters' },
    },
  },
  'Sign up': {
    name: {
      required: 'Name cannot be empty',
      maxLength: { value: 30, message: 'Name can be maximum of 30 characters' },
    },
    email: {
      required: 'Email cannot be empty',
      validate: (value: string) => {
        return (
          [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/].every(pattern => pattern.test(value)) ||
          'Email is not valid'
        )
      },
    },
    password: {
      required: 'Password cannot be empty',
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      maxLength: { value: 20, message: 'Password can be maximum of 20 characters' },
      validate: (value: string) => {
        return (
          [/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/].every(pattern => pattern.test(value)) ||
          'Password is weak'
        )
      },
    },
  },
}
