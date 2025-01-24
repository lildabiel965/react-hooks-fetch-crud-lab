import React from "react";
import { fetch } from "whatwg-fetch";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleUpdate = (index) => {
    
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...question, correctIndex: Number(index)})
    }).then((res) => res.json()).then((data) => console.log(data))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index} onChange={() => handleUpdate(index)}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json()).then((data) => console.log(data))
  }



  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => handleUpdate(e.target.value)}>{options}</select>
      </label>
      <button onClick={() => handleDelete()}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
