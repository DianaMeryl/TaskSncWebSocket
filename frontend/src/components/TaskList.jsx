import React from 'react'
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function TaskList() {

  const tasks = useSelector(state => state.tasks);

  return (
    <ul className="mt-10">
    <li className="my-2 text-xl italic">All Tasks Here...</li>
    {tasks && tasks.length > 0 ? (
        tasks.map((task, index) => (
            <TaskItem key={task.taskID} task={task} index={index} />
        ))
        ) : (
          <p>No tasks available</p>
    )}

</ul>
  )
}

export default TaskList