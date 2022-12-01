import { IonButton, IonInput, IonItem } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Page from "../../../common/components/Page/Page";
import { useMe } from "../../../common/hooks/useMe";
import { RouteEnum } from "../../../common/models/RouteEnum";
import { useLogin } from "../hooks/useLogin";

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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate } = useLogin();

  const { data: user } = useMe();

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push(RouteEnum.DASHBOARD);
    }
  }, [user, history]);

  return (
    <Page withBackButton title="Signup">
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
            Log in
          </Button>

          <Button routerLink={RouteEnum.SIGNUP} fill="default">
            Don't have an account? Sign Up
          </Button>
        </div>
      </Container>
    </Page>
  );
};

export default LoginPage;
