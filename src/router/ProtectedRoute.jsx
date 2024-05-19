import { PropTypes } from 'prop-types'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, token }) => {
  if (!token) {
    return <Navigate to="/locations" />
  } else {
    return children
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  token: PropTypes.string
}
