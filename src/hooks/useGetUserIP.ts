import axios from "axios";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  setCountryCode,
  setExchangeRate,
  setIpObject,
} from "../redux/reducers/app/appReducer";

const useGetUserIP = () => {
  const dispatch = useAppDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;

    axios
      .get("https://ipapi.co/json")
      .then((res) => {
        dispatch(setIpObject(res.data));
        dispatch(setExchangeRate(16.0));
        dispatch(setCountryCode(res.data.country_code));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export default useGetUserIP;
