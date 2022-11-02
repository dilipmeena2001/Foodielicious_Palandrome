import './App.css';
import Favourites from './components/Favourites';
import Search from './components/Search';
import Meals from './components/Meals';
import Modal from './components/Modal';
import { useGlobalContext } from './context';


function App() {
  const {showModal,favourites} = useGlobalContext()
  return (
    <main>
      <Search />
      {favourites.length > 0 && <Favourites />}
      <Meals />
     {showModal && <Modal />} 
    </main>
  );
}

export default App;
