import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  FormElement,
  Input,
  Link,
  Modal,
  Navbar,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import LoginButton from "./LoginButton";
import SignUpModal from "./SignUpModal";

const CrazyNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleOpenSignUpModal = () => {
    setVisible(true);
  };
  const handleCloseSignUpModal = () => {
    setVisible(false);
  };

  const handleSignUp = () => {};

  useEffect(() => {
    if (window.localStorage.getItem("userToken")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Navbar isBordered variant={"sticky"}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Paper
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link isActive href="#">
            Explore
          </Navbar.Link>
          <Navbar.Link href="#">Collection</Navbar.Link>
        </Navbar.Content>
        {!isAuthenticated && (
          <Navbar.Content>
            <Navbar.Item>
              <LoginButton />
            </Navbar.Item>
            <Navbar.Item>
              <Button onClick={handleOpenSignUpModal}>Sign Up</Button>
              {/*<SignUpButton />*/}
            </Navbar.Item>
          </Navbar.Content>
        )}
      </Navbar>
      <SignUpModal visible={visible} onClose={handleCloseSignUpModal} />
    </>
  );
};

export default CrazyNav;
