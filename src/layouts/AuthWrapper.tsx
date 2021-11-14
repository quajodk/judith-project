import React, { ReactNode, useEffect, useRef, useState } from "react";
import { authStateChange } from "../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface Props {
  children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { adminUser } = useAppSelector((state) => state.app);
  const [loading, setLoading] = useState(true);

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    if (!adminUser) dispatch(authStateChange());
    else setLoading(false);
  }, [adminUser]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthWrapper;
