import React, {useState,useEffect}from 'react';
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
  const [votecolor, setVotecolor] = useState("teal");
  const [unvotecolor,setUnvotecolor] = useState("teal")
  const alert = useAlert();
  const user = {
    username: username
  }
  useEffect(() => {
    if (user && votes.find((vote) => vote.username === user.username)) {
      setVotecolor("red");
    } else setVotecolor("teal");
  }, [user, votes,alert]);

  useEffect(() => {
    if (user && unvotes.find((unvote) => unvote.username === user.username)) {
      setUnvotecolor("red");
    } else setUnvotecolor("teal");
  }, [user, unvotes,alert]);


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
      <Button color={votecolor}>
        <Icon name='comment' />
votes
</Button>
      <Label as='a' basic color={votecolor} pointing='left'>
        {votes.length}
      </Label>
    </Button>
    </MyPopup>
  </div>
  
    <div className=" float-right">
    <MyPopup content="this answer was not helpful">
      <Button as='div' labelPosition='right' onClick={submitUnvote}>
        <Button color={unvotecolor}>
          <Icon name='comment' />
unvotes
</Button>
        <Label as='a' basic color={unvotecolor} pointing='left'>
          {unvotes.length}
        </Label>
      </Button>
      </MyPopup>
    </div>
    <br />
  </>
}

export default Vote;