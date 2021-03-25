import React, { useState } from 'react';
import axios from 'axios';
import { token, username } from '../../context/usercontext'
import { useAlert } from "react-alert";

function Createanswer({ questionid }) {
  const alert = useAlert()
  const [createanswer, setCreateanswer] = useState({ content: '' });

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const data = {
      id: questionid,
      content: createanswer.content,
      username: username
    }
    const result = await axios.post("https://sri-questionsoverflow.herokuapp.com/question/createanswer", data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
    })
    if (result) {
      alert.success(result.data.message)
      window.location.reload();
    } else {
      alert.error("answer not created")
    }
  }
  return <form>
    <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">Answer</label>
      <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="your answer"
        value={createanswer.content}
        onChange={(e) => setCreateanswer({ ...createanswer, content: e.target.value })}
      ></textarea>
    </div>

    <button
      type="submit"
      className=" btn btn-outline-primary py-2 float-right"
      onClick={onSubmitHandler}
    >
      Submit
                </button>
    <br />
  </form>
}

export default Createanswer;