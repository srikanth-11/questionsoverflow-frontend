import React from 'react';
import { useAlert } from "react-alert";
import { username, token } from '../../context/usercontext'
import MyPopup from '../../util/mypopup'

import axios from 'axios'

import {
  Button,
  Icon,
  Label,
} from 'semantic-ui-react';

function Vote({ questionid, id, votes, unvotes }) {
  const alert = useAlert();
  const user = {
    username: username
  }
  const submitVote = async () => {
    const data = {
      id: questionid,
      username: user.username,
      answerid: id
    }
    const result = axios.post("https://sri-questionsoverflow.herokuapp.com/question/vote", data,
      {
        headers: {
          "Content-Type": "application/json",
          'authorization': token,

        },
      }
    );
    console.log(result)
    if (result) {
      alert.success("vote send")
      window.location.reload();


    } else {
      alert.error("error occured")
    }
  }

  const submitUnvote = async () => {
    const data = {
      id: questionid,
      username: user.username,
      answerid: id
    }
    const result = axios.post("https://sri-questionsoverflow.herokuapp.com/question/unvote", data,
      {
        headers: {
          "Content-Type": "application/json",
          'authorization': token,

        },
      }
    );
    
    if (result) {
      alert.success("unvote send")
} else {
      alert.error("error occured")
    }
  }



  return <>    <div className="float-right">
    <MyPopup content="this answer was helpul">
    <Button as='div' labelPosition='right' onClick={submitVote}>
      <Button color='teal'>
        <Icon name='comment' />
votes
</Button>
      <Label as='a' basic color='teal' pointing='left'>
        {votes}
      </Label>
    </Button>
    </MyPopup>
  </div>
  
    <div className=" float-right">
    <MyPopup content="this answer was not helpful">
      <Button as='div' labelPosition='right' onClick={submitUnvote}>
        <Button color='teal'>
          <Icon name='comment' />
unvotes
</Button>
        <Label as='a' basic color='teal' pointing='left'>
          {unvotes}
        </Label>
      </Button>
      </MyPopup>
    </div>
    <br />
  </>
}

export default Vote;