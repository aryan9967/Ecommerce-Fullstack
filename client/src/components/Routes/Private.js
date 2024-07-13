import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth.js';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner.jsx';

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      console.log('userauth');
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      console.log(res.data);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
