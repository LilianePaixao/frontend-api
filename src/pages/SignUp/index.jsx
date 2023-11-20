import { useState } from 'react'
import { Container, Form, Background } from './styles.js'
import { Input } from '../../components/Input/index.jsx'
import { Button } from '../../components/Button/index.jsx'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { ButtonText } from '../../components/ButtonText/index.jsx'
import { Link, useNavigate } from 'react-router-dom'

import { api } from '../../services/api.js'

export function SignUp(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //levar o usuário para a página de login
  const navigate = useNavigate()

  function handleSignUp() {
    if(!name || !email || !password){
      return alert("Preencha todos os campos!")
    }

    api.post("/users", {name, email, password})
      .then(() => {
        alert("Usuário cadastrado com sucesso!")
        navigate("/")
      })
      .catch(error => {
        if(error.response){
          alert(error.response.data.message)
        }else{
          alert("Não foi possível cadastrar")
        }
      })
  }

  return(
    <Container>
       <Background/>

      <Form>
        <h1>Rocket Notes</h1>
        <p> Aplicação para salvar e gerenciar seus links úteis</p>

        <h2>Crie sua conta</h2>

        <Input 
          placeholder= "Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />
        
        <Input 
          placeholder= "E-mail"
          type="text"
          icon={FiMail}
          onChange={e=>setEmail(e.target.value)}
        />
         <Input 
          placeholder= "Senha"
          type="password"
          icon={FiLock}
          onChange={e=>setPassword(e.target.value)}
        />
        <Button title="Cadastrar" onClick={handleSignUp} />

      <Link to = "/">
       
          <ButtonText title="Voltar para o Login"/>
       
      </Link>
      </Form>
     
    </Container>
  )
}