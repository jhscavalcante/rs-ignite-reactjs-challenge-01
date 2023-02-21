import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

export interface TaskType {
  id: string;
  description: string;
  completed: true | false;  
}

interface TaskProps {
  task: TaskType,
  onCompleteTask: (task: TaskType) => void;
  onDeleteTask: (task: string) => void;
}

export function Task({ task, onCompleteTask, onDeleteTask }: TaskProps){

  function handleCompleteTask() {
    onCompleteTask(task)
  }

  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  return (
    <div className={task.completed ? styles.lineBoxComplete : 
      styles.lineBox}>
      <div className={styles.lineColumnFirst}>
        <input 
          type="checkbox" 
          name="item" 
          id={task.id} 
          onClick={handleCompleteTask}
          onChange={handleCompleteTask}
          checked={task.completed}                     
        />
      </div>
      <div 
        className={task.completed ? 
                   styles.lineColumnMiddleComplete : 
                   styles.lineColumnMiddle}>
        {task.description}
      </div>
      <div className={styles.lineColumnLast}>
        <button title='Excluir tarefa' onClick={handleDeleteTask}>
          <Trash size={24} />
        </button>
      </div>
    </div>
  )
}

