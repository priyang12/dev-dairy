import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";
import { getAuth } from "firebase/auth";

//Component: login
import Login from "../login";
import { BrowserRouter } from "react-router-dom";

//Test: login
it("Login Form", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
  //Test: login form
  const email = screen.getByText("email");
  const password = screen.getByText("password");
  const submitBtn = screen.getByText("Log In");
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();

  //Test: login form fields
  userEvent.type(email, "PatelPriyang95@gmail.com");
  userEvent.type(password, "12345678");

  console.log(email.textContent);

  //Test: login form submit
  userEvent.click(submitBtn);
});
