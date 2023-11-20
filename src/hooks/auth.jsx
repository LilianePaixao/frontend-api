import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext({})

//guardo os dados do usuário autenticado em estado
function AuthProvider({ children }) {
  const [data, setData] = useState({})
 
  async function signIn({email, password}) {

    try{
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data

      //colocando no storage
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      localStorage.setItem("@rocketnotes:token", token)

      api.defaults.headers.common['Authorization'] =  `Beare ${token}`

      setData({user, token})

  } catch (error) {
    if (error.response) {
      alert(error.response.data.message)
    } else {
      alert("Não foi possível entrar.")
    }
  }
}

  function signOut(){
  //remover as inforamações do localstorage
  localStorage.removeItem("@rocketnotes:token")
  localStorage.removeItem("@rocketnotes:user")

   //mudo o estado = usuário agora fica vazio
   setData({})
  }

  //atualizar os dados do usuário no banco de dados
  async function updateProfile({ user, avatarFile }) {
    try{

      if(avatarFile){
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar
      }
      await api.put("/users", user)
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      
      setData({ user, token: data.token})
      alert("Perfil atualizado!")

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível atualizar o perfil.")
      }
    }

  }

  //coloca as informações no localStorage
  useEffect(()=> {
  const token =localStorage.getItem("@rocketnotes:token")
  const user =localStorage.getItem("@rocketnotes:user")

  if( token && user ) {
    api.defaults.headers.common['Authorization'] =  `Beare ${token}`
    
    setData({
      token,
      user: JSON.parse(user)
    })
  }
  }, [])

  return (
  <AuthContext.Provider value={{ 
    signIn, 
    signOut,
    updateProfile,
    user: data.user
     }}>
    {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
 const context = useContext(AuthContext)

 return context
}

export { AuthProvider, useAuth }