import React, { useState } from 'react';
import axios from 'axios';
import { username, useremail, token } from '../../context/usercontext'
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import auth from '../../service/auth'





function Createquestion() {
  const history = useHistory()
  const alert = useAlert()
  const [createquestion, setCreatequestion] = useState({ title: '', content: '', tag1: ' ', tag2: ' ' });
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const data = {
      email: useremail,
      content: createquestion.content,
      title: createquestion.title,
      tag1: createquestion.tag1,
      tag2: createquestion.tag2,
      username: username,
    }
    const result = await axios.post("https://sri-questionsoverflow.herokuapp.com/question/createquestion", data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
    })
    if (result) {
      alert.success(result.data.message)
      history.push("/app")
    } else {
      alert.error("question not created")
    }
  }

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
    <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="title of the question"
          value={createquestion.title}
          onChange={(e) => setCreatequestion({ ...createquestion, title: e.target.value })}
        />
      </div>


      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Body</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="explain your question"
          value={createquestion.content}
          onChange={(e) => setCreatequestion({ ...createquestion, content: e.target.value })}
        ></textarea>
      </div>

      <div className="form-row">
        <div className="col">
          <label htmlFor="exampleFormControlInput2">Tag</label>
          <input type="text" className="form-control" id="exampleFormControlInput2"
            value={createquestion.tag1}
            onChange={(e) => setCreatequestion({ ...createquestion, tag1: e.target.value })}
          />
        </div>
        <div className="col">
          <label htmlFor="exampleFormControlInput3">Tag</label>
          <input type="text" className="form-control" id="exampleFormControlInput3"
            value={createquestion.tag2}
            onChange={(e) => setCreatequestion({ ...createquestion, tag2: e.target.value })}
          />
        </div>
      </div>
      <br />
      <button
        type="submit"
        className=" btn btn-outline-primary py-2 float-right"
        onClick={onSubmitHandler}
      >
        Submit
                </button>

    </form>
  </div>
}

export default Createquestion;