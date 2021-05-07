import React, { useState, useEffect,useContext } from 'react';
import { useHistory, Link } from "react-router-dom";

import axios from 'axios'
import moment from 'moment';
import Comment from '../../components/comment/comment'
import Vote from '../../components/votes/votes'
import Loader from "react-loader-spinner";
import auth from '../../service/auth'
import { username, token } from '../../context/usercontext'
import {countContext} from '../../context/context'

import {
  Card
} from 'semantic-ui-react';
import Createanswer from '../createanswer/createanswer';

function Singlequestion(props) {
  const [count,setCount]= useContext(countContext)
  const history = useHistory()
  const [question, setQuestion] = useState([]);
  const questionId = props.match.params.questionId;
  const [loader, setloader] = useState("false");

  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };


  useEffect(() => {
    const fetchData = async () => {
      setloader("true")
      const data = {
        id: questionId
      }
      const result = await axios.post(
        "https://sri-questionsoverflow.herokuapp.com/question/getquestion", data,
        {
          headers: {
            "Content-Type": "application/json",
            'authorization': token
          },
        }
      );
      if (result) {
        setloader("false")
        setQuestion(result.data.question);


      }
    };

    fetchData();
  }, [questionId,count]);



  return <div className="container-fluid">
    <h1 style={{ justifyContent: "center", textAlign: "center" }}>
      {" "}
   Questionsoverflow
    </h1>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <Link to="/app">
        <button className="btn btn-primary float-left" >
          Allquestions
   </button>
      </Link>
    </div>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <button className="btn btn-dark float-right" onClick={Logout}>
        logout
   </button>
    </div>
    <div>
      <h1
        style={{ justifyContent: "center", textAlign: "center" }}
        id="fix"
        className="text-primary center"
      >
        {username}
      </h1>
    </div>

    <div className="row">
      <div className="col-xl-12 col-md-10 mb-4 p-1">
        <div className="card   shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div style={{ zIndex: -1 }}>
                  {" "}
                  <Loader
                    type="BallTriangle"
                    color="#00BFFF"
                    height={160}
                    width={160}
                    visible={loader}
                  />
                </div>
                
                <h3>{question.title}  (<span> {moment(question.createdAt).fromNow()}) by {question.username}</span></h3>
               
                <p>{question.content}</p>
                <Createanswer questionid={question._id}></Createanswer><br />
                {question.answers && question.answers.map((answer) => (
                  <Card fluid key={answer.id}>
                    <Card.Content>
                      <Card.Header>{answer.username}({moment(answer.createdAt).fromNow()})</Card.Header>
                      <Card.Meta></Card.Meta>
                      <Card.Description>{answer.content}</Card.Description>
                      <Vote questionid={questionId} id={answer._id} votes={answer.votes} unvotes={answer.unvotes}></Vote>
                      <Comment questionid={questionId} id={answer._id}></Comment>
                      {answer.comments && answer.comments.map((comment) => (
                        <Card fluid key={comment._id}>
                          <Card.Content>
                            <Card.Header>{comment.username}</Card.Header>
                            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{comment.content}</Card.Description>
                          </Card.Content>
                        </Card>
                      ))}
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

}
export default Singlequestion;