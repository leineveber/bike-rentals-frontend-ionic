import { ComponentType, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../components/Loading/Loading";
import { useMe } from "../hooks/useMe";
import { RouteEnum } from "../models/RouteEnum";

export function withAdmin<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const { data: user } = useMe();
    const [isAccessed, setIsAccessed] = useState(false);
    const history = useHistory();

    useEffect(() => {
      if (user?.role === "admin") {
        setIsAccessed(true);
      } else {
        history.push(RouteEnum.DASHBOARD);
      }
    }, [user?.role, history]);

    return !isAccessed ? <Loading /> : <Component {...props} />;
  };
}
