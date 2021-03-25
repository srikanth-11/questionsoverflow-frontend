import React, { useState } from 'react';
import { username, token } from '../../context/usercontext'
import { useAlert } from "react-alert";

import axios from 'axios';

import {
  Card,
  Form,
} from 'semantic-ui-react';


function Comment({ questionid, id }) {
  const alert = useAlert();
  const user = {
    username: username
  }
  const [comment, setComment] = useState('');

  const submitComment = async () => {
    const data = {
      id: questionid,
      username: user.username,
      content: comment,
      answerid: id
    }
    const result = axios.put("https://sri-questionsoverflow.herokuapp.com/question/createcomment", data,
      {
        headers: {
          "Content-Type": "application/json",
          'authorization': token,
        },
      }
    );
    if (result) {
      alert.success("comment created")
      window.location.reload()
    } else {
      alert.error("comment not created")
    }
  }

  return <Card fluid>
    <Card.Content>
      <p>Post a comment</p>
      <Form>
        <div className="ui action input fluid">
          <input
            type="text"
            placeholder="Comment.."
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}

          />
          <button
            type="submit"
            className="ui button teal"
            disabled={comment.trim() === ''}
            onClick={submitComment}
          >
            Submit
       </button>
        </div>
      </Form>
    </Card.Content>
  </Card>
}

export default Comment;