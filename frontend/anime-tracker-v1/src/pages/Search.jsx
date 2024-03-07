import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();

    function goToHome() {
        navigate('/');
    }
    return (
      <div>
        <p> this is the search page</p>
        <Button onClick={goToHome}>Home</Button>
      </div>
    );
  }
  
  export default Search;