import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css';
import { Label, Button, Icon } from 'semantic-ui-react'
import Loader from "react-loader-spinner";
import { token, username } from '../../context/usercontext'
import auth from '../../service/auth'
import MyPopup from '../../util/mypopup'
import { useAlert } from "react-alert";



function Questioncard() {
  const [question, setQuestion] = useState([]);
  const [loader, setloader] = useState("false");
  const history = useHistory()
  const alert = useAlert()
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      setloader("true");
      const result = await axios.get(
        "https://sri-questionsoverflow.herokuapp.com/question/getquestions",
        {
          headers: {
            "Content-Type": "application/json",
            'authorization': token,
          },
        }
      );
      if (result) {
        setloader("false");
        setQuestion(result.data.questions);
      } else {
        setloader("false")
        alert.error("something went wrong")
      }
    };

    fetchData();
  }, []);
  return <div className="container-fluid">
    <h1 style={{ justifyContent: "center", textAlign: "center" }}>
      {" "}
   Questionsoverflow
    </h1>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <Link to="/createquestion">
        <button className="btn btn-primary float-left" >
          Askquestion
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
      {
        question.map(item => (<>

          <div className="col-xl-12 col-md-10 mb-4 p-1 " key={item._id}>

            <div className="card   shadow h-100 py-2">
              <div className="card-body">

                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <h3>{item.title}</h3>
                    <p> {moment(item.createdAt).fromNow()}</p>
                    <div>
                      {item.tags && item.tags.filter(word => word.tag != null).map((tag) => (
                        <Label key ={tag._id}color="blue">{tag.tag}</Label>
                      ))}
                    </div>
                    <br />
                    <div className=" float-right" key={item._id}>
                      <MyPopup content="click to view the answers">
                        <Button as='div' labelPosition='right' as={Link} to={`/questions/${item._id}`}>
                          <Button color='teal'>
                            <Icon name='comment' />
                                answers
                              </Button>
                          <Label as='a' basic color='teal' pointing='left'>
                            {item.answers.length}
                          </Label>
                        </Button>
                      </MyPopup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        ))
      }
    </div>
  </div>
}

export default Questioncard