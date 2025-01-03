import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PostAnswer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Register User page
    navigate('/view-admin-question');
  }, [navigate]);

  return null; // No UI, just performs the redirection
};

export default PostAnswer;
