import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';

function App() {
  const [items , setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')))
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('updating items state')
  }, [items])

  const setAndSaveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem('shoppingList', JSON.stringify(newItems))
  }

  const addItem = (item) => {
    const id = items.length? items[items.length - 1].id+1 : 1
    const myNewItem = {id, checked:false, item}
    const listItems = [...items, myNewItem]
    setAndSaveItems(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item,checked: !item.checked} : item)
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !==id)
    setAndSaveItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return
    addItem(newItem)
    setNewItem('')
  }
  
  return (
    <div className="App">
      <Header title="Grocery List"/>
      <AddItem
        newItem = {newItem}
        handleSubmit = {handleSubmit}
        setNewItem = {setNewItem}
      />
      <SearchItem
        search = {search}
        setSearch = {setSearch}
      />
      <Content 
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer length = {items.length}/>
    </div>
  );
}

Header.defaultProps = {
  title: "Default Title"
}

export default App;
