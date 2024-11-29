import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be at least 4 characters long",
};

export default function Login() {
  // erdem.guntay@wit.com.tr
  // 9fxIH0GXesEwH_I
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState(errorMessages);

  const history = useHistory();

  useEffect(() => {
    setErrors({
      email: validateEmail(form.email) ? "" : errorMessages.email,
      password: validatePassword(form.password) ? "" : errorMessages.password,
    });

    // console.log(errors);

    if (
      validateEmail(form.email) &&
      validatePassword(form.password) &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push("./Success");
        } else {
          history.push("./Error");
        }
      });
  };

  // form valdates -> email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // form valdates -> password
  const validatePassword = (password) => {
    return password.length > 4 ? true : false;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!!errors.email}
          data-cy="input-email"
        />
        {errors.email && (
          <FormFeedback data-cy="error-email">{errors.email}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={!!errors.password}
          data-cy="error-password"
        />
        {errors.password && (
          <FormFeedback data-cy="error-password">
            {errors.password}
          </FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          data-cy="checkbox"
        />{" "}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button type="submit" disabled={!isValid} color="primary">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
