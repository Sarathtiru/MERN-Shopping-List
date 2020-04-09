import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Logout = props => {
  Logout.propTypes = {
    logout: PropTypes.func.isRequired
  };

  return (
    <Fragment>
      <NavLink onClick={props.logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
//   });

export default connect(
  null,
  { logout }
)(Logout);
