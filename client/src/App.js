import './App.css';
import { UserContextProvider } from './Hooks/UserContext';
import AppRoutes from './Routes/AppRoutes';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DarkMode from './Components/DarkMode';

function App() {
  return (
      <UserContextProvider>
        <DarkMode />
        <main className="app">
          <Header />
          <div className="content">
            <AppRoutes />
          </div>
          <Footer />
        </main>
      </UserContextProvider>
  );
}

export default App;
