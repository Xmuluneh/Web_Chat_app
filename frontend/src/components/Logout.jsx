import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icon/bi';
function Logout() {
  const navigate = useNavigate();
  const handelClick = async () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Button onClick={handelClick}>
      Logout <BiLogOutCircle /> {''}
    </Button>
  );
}

export default Logout;
