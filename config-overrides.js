const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@Admin_components' : 'src/components/Admin_components',
    '@Manager_components' : 'src/components/Manager_components',
    '@Employee_components' : 'src/components/Employee_components',
    // -------------------------------------------------------------------------------------------------------
    '@routes' : 'src/routes',
    '@photos' : 'src/photos',
    '@login,sign-up' : 'src/routes/login,sign-up',
    '@home' : 'src/routes/home',
    '@homecompo' : 'src/routes/home/homecompo',
    '@projects' : 'src/routes/projects',
    '@user' : 'src/routes/user',
  })(config)

  return config
}