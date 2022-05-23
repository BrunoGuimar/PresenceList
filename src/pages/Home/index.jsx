import React, { useState, useEffect } from 'react'
import './styles.css'
import Card from '../../componentes/Card'

function home() {
  
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name:``, avatar:``})
  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    //corpo do use effect
    fetch('https://api.github.com/users/BrunoGuimar')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  },[students])
  return (
    <div className="container">
      <header>
      <h1> Presence list</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de Perfil" />
      </div>
      
      </header>
   
    <input type="text" placeholder="type a name" onChange={e => setStudentName(e.target.value)}/>
    <button type="button" onClick={handleAddStudent}>Add</button>

    {
      students.map(student => 
      <Card 
      key={student.time}
      name ={student.name} 
      time = {student.time}
       />)
    }
    </div>
    )
}

export default home
