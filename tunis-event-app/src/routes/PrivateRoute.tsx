// src/routes/PrivateRoute.tsx
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivateRoute = ({
  component: Component,
  allowedRoles,
  ...rest
}: any) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user && allowedRoles.includes(user.role) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
