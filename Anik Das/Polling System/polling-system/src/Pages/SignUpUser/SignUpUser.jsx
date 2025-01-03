import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
      // Redirect to the Register User page
      navigate('/users/login');
    }, [navigate]);
  
    return null; // No UI, just performs the redirection
};

export default SignUpUser;