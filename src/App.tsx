
import './global.css';
import styles from './App.module.css';
import todoLogo from './assets/empty-list.svg';

import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Task, TaskType } from './components/Task';


export function App() {

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState('');

  const isTaskEmpty = task.length === 0;
  const qtyCompletedTasks = tasks.reduce((result, obj) => {
    return (result + (obj.completed === true ? 1 : 0))
  }, 0)

  function handleAddNewTask(event: FormEvent){
    event.preventDefault();
    setTasks([...tasks, { id: uuidv4(), description: task, completed: false}]) 
    setTask('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('')
    setTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleCompleteTask(taskSelected: TaskType){

    const taskUpdated:TaskType = {
      id: taskSelected.id, 
      description: taskSelected.description, 
      completed: !taskSelected.completed 
    }

    const tasksList = tasks.map(task => {
      if(taskSelected.id === task.id){        
        return taskUpdated;
      }
      return task;      
    });         

    setTasks(tasksList);    
  }

  function hanldeDeleteTask(taskToDelete: string){
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete;
    });
    setTasks(tasksWithoutDeletedOne);
  }

  return (    
    <>
      <Header />
      
      <div className={styles.wrapper}>
        <form className={styles.taskForm} onSubmit={handleAddNewTask}>
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            value={task}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button 
            type="submit"
            disabled={isTaskEmpty}
          > Criar 
            <PlusCircle size={20}
          />
          </button>
        </form>
      </div>   

      <div className={styles.totalsBox}>
        <div className={styles.totalsContent}>
          <p>Tarefas criadas <span>{tasks.length}</span></p>
          <p>Concluídas
            <span>{tasks.length > 0 ? `${qtyCompletedTasks} de ` : ''}
            {tasks.length}
            </span>
          </p>
        </div>                    
      </div>   
      
      {tasks.length === 0 ?
        <div className={styles.listEmpty}>            
          <img src={todoLogo} alt="Lista de tarefas vazia" />   
          <p className={styles.listEmptyMsgInfo}>
            Você ainda não tem tarefas cadastradas
          </p>
          <p>Crie tarefas e organize seus itens a fazer</p>            
        </div>   
      :   
        <div className={styles.listTasks}>              
          {tasks.map(task => {
            return (
              <Task 
                task={task} 
                key={task.id} 
                onCompleteTask={handleCompleteTask}
                onDeleteTask={hanldeDeleteTask}
              />)
            })
          }
        </div>      
      }        
    </>
  )
}
