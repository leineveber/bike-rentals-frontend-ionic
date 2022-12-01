import { IonButton, IonInput, IonItem } from "@ionic/react";
import React, { useState } from "react";
import styled from "styled-components";
import Page from "../../../common/components/Page/Page";
import { RouteEnum } from "../../../common/models/RouteEnum";
import { useSignup } from "../hooks/useSignup";

const opacity = 0.9;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://res.cloudinary.com/lapkinthegod/image/upload/v1668862112/w213_b7idqn.jpg");
  background-size: cover;
  background-position-x: center;
`;

const Item = styled(IonItem)`
  opacity: ${opacity};
`;

const Input = styled(IonInput)`
  opacity: ${opacity};
`;

const Button = styled(IonButton)`
  opacity: ${opacity};
`;

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate } = useSignup();

  return (
    <Page title="Signup">
      <Container>
        <div>
          <Item>
            <Input
              type="email"
              placeholder="Email"
              onIonChange={(event) => setEmail(event.target.value as string)}
            />
          </Item>
          <Item>
            <Input
              type="password"
              placeholder="Password"
              onIonChange={(event) => setPassword(event.target.value as string)}
            />
          </Item>
          <Button expand="block" onClick={() => mutate({ email, password })}>
            Sign up
          </Button>

          <Button routerLink={RouteEnum.LOGIN} fill="default">
            Already have an account? Sign In
          </Button>
        </div>
      </Container>
    </Page>
  );
};

export default SignupPage;
