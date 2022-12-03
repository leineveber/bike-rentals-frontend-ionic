import { ComponentType, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../components/Loading/Loading";
import { useMe } from "../hooks/useMe";
import { RouteEnum } from "../models/RouteEnum";

export function withUser<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const { data: user } = useMe();
    const [isAccessed, setIsAccessed] = useState(false);
    const history = useHistory();

    useEffect(() => {
      if (user) {
        setIsAccessed(true);
      } else if (user !== undefined) {
        history.push(RouteEnum.SIGNUP);
      }
    }, [user, history]);

    return !isAccessed ? <Loading /> : <Component {...props} />;
  };
}
