import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './screens/Landing';
import { Profile } from './screens/Profile';
import { Home } from './screens/Home';
import {LoginComponent} from './screens/Login';
import {SignUpComponent} from './screens/SignUp';
import { Post } from './screens/Post';
import { NewPost } from './screens/NewPost';
import { EditPost } from './screens/EditPost';
import { Explore } from './screens/Explore';
import { EditProfile } from './screens/EditProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/user/:id" exact component={Profile}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/login" exact component={LoginComponent}/>
          <Route path="/signup" exact component={SignUpComponent}/>
          <Route path="/post/:id" exact component={Post}/>
          <Route path="/newpost" exact component={NewPost}/>
          <Route path="/editpost/:id" exact component={EditPost}/>
          <Route path="/explore" exact component={Explore}/>
          <Route path="/editprofile/:id" exact component={EditProfile}/>
          {/* <Route path="/followers" exact component={}/>*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
