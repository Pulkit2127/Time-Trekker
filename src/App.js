import Main from './components/mainPage/Main';
import List from './components/List/List';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
const App=()=> {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Main></Main>} />
      <Route path="/list" element={<List></List>} />
      </Routes>
    </Router>
  );
}
export default App;
