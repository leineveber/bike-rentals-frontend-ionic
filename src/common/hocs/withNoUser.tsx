import { ComponentType, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../components/Loading/Loading";
import { useMe } from "../hooks/useMe";
import { RouteEnum } from "../models/RouteEnum";

export function withNoUser<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const { data: user } = useMe();
    const [isAccessed, setIsAccessed] = useState(false);
    const history = useHistory();

    useEffect(() => {
      if (user === null) {
        setIsAccessed(true);
      } else if (user !== undefined) {
        history.push(RouteEnum.DASHBOARD);
      }
    }, [user, history]);

    return !isAccessed ? <Loading /> : <Component {...props} />;
  };
}
