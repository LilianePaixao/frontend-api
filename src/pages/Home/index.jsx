import { api } from '../../services/api'
import { Container, Brand, Menu, Search, Content, NewNote} from  './styles.js'
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Note } from '../../components/Note'
import { Section } from '../../components/Section'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function Home(){
  const [search, setSearch] = useState("")
  const[tags, setTags] = useState([])
  const[tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleTagSelected(tagName){
    if(tagName == "all"){
      return setTagsSelected([])
    }

    //clico em cima do button text e ele deixar de estar selecionado
    const alreadySelected = tagsSelected.includes(tagName) //dá true ou false
    
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)

    }else{
    setTagsSelected(prevState => [...prevState,tagName])
    }
  }

  function handleDetails(id){
    navigate(`/details/${id}`)

  }

  
  //useEffect não aceita async
  useEffect(()=> {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }  

    fetchTags()

  }, [])

  //input search, executado se o usuário selecionar uma tag nova
  useEffect(()=> {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes()

  }, [tagsSelected, search])


  return(
    <Container>
      <Brand>
        <h1>Notes</h1>
      </Brand>
      <Header />

      <Menu>
      <li>
        <ButtonText 
          title="Todos" 
          onClick={()=> handleTagSelected("all")}
          $isActive ={tagsSelected.length === 0}
        />
      </li>
        {
          tags && tags.map(tag=> (
            <li key={String(tag.id)}>
              <ButtonText 
                title={tag.name} 
                onClick={() => handleTagSelected(tag.name)}
                $isActive ={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          icon={FiSearch}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
            <Note 
              key={String(note.id)}
              data={ note }
              onClick={()=> handleDetails(note.id)}
            />
            ))
          }

            
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        <span>Criar Nota</span>
      </NewNote>

    </Container>
  )
}