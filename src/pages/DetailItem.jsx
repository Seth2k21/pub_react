import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function DetailItem() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('user')){
      navigate('/')
    }
  });
  return (
    <>
      <div>
        <h1>Detail Item no {data.id}</h1>
        <Link to="/">Home</Link>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p>
        </div>
    </>
  )
}

export default DetailItem
