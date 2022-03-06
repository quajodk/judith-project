import React, { ReactNode, useEffect, useRef } from "react";
import PageLoader from "../components/PageLoader";
import { authStateChange } from "../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface Props {
  children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { adminUser, isAuthenticating } = useAppSelector((state) => state.app);

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    if (!adminUser) dispatch(authStateChange());
  }, [adminUser]);

  if (isAuthenticating) return <PageLoader />;

  return <>{children}</>;
};

export default AuthWrapper;
