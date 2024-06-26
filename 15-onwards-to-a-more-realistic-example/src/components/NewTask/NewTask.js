import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-https";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {

    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    // firebaseio secured from writes to database without authenciation
    // disable this to get this example working
    sendTaskRequest({
      url: "https://react-http-9793d-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: taskText },
    }, createTask.bind(null, taskText));

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
