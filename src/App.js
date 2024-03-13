import './App.css';
import LoadingPage from './Components/Loading Page/LoadingPage';
import NotFoundPage from './Pages/Not Found Page/NotFoundPage';
import Router from './Router';

function App() {

  return (
    <div className="App">
      <Router/>
      {/* <NotFoundPage/> */}
    </div>
  );
}

export default App;
