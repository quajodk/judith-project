import React from "react";
import { BallSpinner } from "react-spinners-kit";

interface Props {}

const PageLoader = (props: Props) => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <BallSpinner />
    </div>
  );
};

export default PageLoader;
