import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
import './Compose.css'
import { BsPencil } from "react-icons/bs";

export default function ComposeButton() {
    const navigate = useNavigate()
  return (
    <Button onClick={() => {navigate('/compose')}} type="button" className='compose-btn dflex justify-content-center mt-2'>
        <span className='compose-label'><BsPencil className='mr-2'/><span className='px-2'>Compose</span></span>
    </Button>
  )
}
