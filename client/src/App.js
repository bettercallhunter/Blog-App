import logo from './logo.svg';
import './App.css';
import Post from './Post';
import Header from './Header';
import IndexPage from './pages/IndexPage';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import DeletePost from './DeletePost';
import Map from './Map';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <IndexPage />
          </Route >
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/create" exact>
            <CreatePost />
          </Route>
          <Route path="/post/:id" exact>
            <PostPage />
          </Route>
          <Route path="/edit/:id" exact>
            <EditPost />
          </Route>
          <Route path="/delete/:id" exact>
            <DeletePost />
          </Route>
          <Redirect to="/" />
        </Switch >
      </Router>
    </UserContextProvider >
  )

}
export default App;

