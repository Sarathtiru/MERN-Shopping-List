import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const RegisterModal = props => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  const { error, isAuthenticated } = props;
  const toggle = useCallback(() => {
    //Clear errors
    props.clearErrors();
    setModal(!modal);
  }, [modal, props]);
  useEffect(() => {
    //Check for register error
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    //If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [error, modal, isAuthenticated, toggle]);

  // const toggle = () => {
  //   //Clear errors

  //   props.clearErrors();
  //   setModal(!modal);
  // };

  const onChange = e => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };

  let state = { name, email, password };

  const onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = state;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };
    // Attempt to register
    props.register(newUser);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
              />
              <Label for="name">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="mb-3"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
