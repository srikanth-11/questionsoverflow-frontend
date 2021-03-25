
import './App.css';
import Questioncard from './components/questioncard/questioncard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Singlequestion from './components/singlequestion/singlequestion'
import Createquestion from './components/createquestion/createquestion';
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Landingpage from './components/landingpage/landingpage'
import Forgotpassword from './components/forgotpassword/forgotpassword'
import Resetpassword from './components/resetpassword/resetpassword'
import ProtectedRoute from './components/protected-route/protectedroute'

function App() {
  const options = { 
    timeout: 3000,
    position: positions.TOP_RIGHT
  };

  return <Provider template={AlertTemplate} {...options}><Router>
    <Switch>
    <ProtectedRoute exact path="/app" component={Questioncard}></ProtectedRoute>
    <ProtectedRoute exact path="/questions/:questionId" component={Singlequestion}></ProtectedRoute>
    <ProtectedRoute exact path="/createquestion" component={Createquestion}></ProtectedRoute>
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/forgotpassword" component={Forgotpassword} />
    <Route exact path="/reset-password/:resetToken" component={Resetpassword} />
    <Route exact path="/" component={Landingpage} />
    </Switch>
    </Router>
    </Provider>
}

export default App;
