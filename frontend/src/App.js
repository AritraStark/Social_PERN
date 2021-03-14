import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './screens/Landing';
import { Profile } from './screens/Profile';
import { Home } from './screens/Home';
import {LoginComponent} from './screens/Login';
import {SignUpComponent} from './screens/SignUp';
import { Post } from './screens/Post';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/login" exact component={LoginComponent}/>
          <Route path="/signup" exact component={SignUpComponent}/>
          <Route path="/post/:id" exact component={Post}/>
          {/* <Route path="/followers" exact component={}/>
          
          <Route path="/user/:id" exact component={}/>
          <Route path="/newpost" exact component={}/>
          <Route path="/editpost/:id" exact component={}/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
