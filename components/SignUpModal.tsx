import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  FormElement,
  Input,
  Link,
  Modal,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { FiMail } from "react-icons/fi";
import SignUpButton from "./SignUpButton";

const SignUpModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [emailVerificationInitiated, setEmailVerificationInitiated] =
    useState(false);

  const handleEmailInput = (e: ChangeEvent<FormElement>) => {
    setEmail(e.target.value);
  };

  const onEmailVerificationInitiated = () => {
    console.log("onEmailVerificationInitiated callback fired");
    setEmailVerificationInitiated(true);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to
          <Text b size={18}>
            {" Paper Store"}
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<FiMail />}
          onChange={handleEmailInput}
          value={email}
        />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Col>
          <Row>
            <Spacer css={{ width: "100%" }} />
            <Button auto flat color="error" onClick={onClose}>
              Close
            </Button>
            <SignUpButton
              email={email}
              onEmailVerificationInitiated={onEmailVerificationInitiated}
            />
          </Row>
          <Spacer />
          {emailVerificationInitiated && (
            <Card css={{ p: "$6", mw: "400px" }}>
              <Card.Header css={{ justifyContent: "center" }}>
                <FiMail size={"36px"} />
                <Spacer x={0.2} />
                <Button size={"sm"} rounded bordered>
                  Open gmail
                </Button>
              </Card.Header>
              <Card.Body css={{ py: "$2", alignItems: "center" }}>
                <Text>Click the login link sent to {email} to continue.</Text>
              </Card.Body>
              <Card.Footer css={{ justifyContent: "center" }}>
                <Text size={"md"}>Or</Text>
                <Spacer x={0.2} />
                <Link
                  target="_blank"
                  href="javascript:setEmailVerificationInitiated(false);"
                >
                  <Text color="primary" size={"md"}>
                    use another email.
                  </Text>
                </Link>
              </Card.Footer>
            </Card>
          )}
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;
