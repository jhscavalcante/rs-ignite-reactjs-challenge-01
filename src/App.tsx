
import styles from './App.module.css';
import todoLogo from './assets/empty-list.svg';
import { Header } from './components/Header';
import { PlusCircle } from 'phosphor-react';

import './global.css';

export function App() {
  return (    
    <>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.taskForm}>
          <input type="text" placeholder='Adicione uma nova tarefa'/>
          <button type="submit">Criar <PlusCircle size={20} /></button>
        </form>
      </div>   

      <div className={styles.totalsBox}>
          <div className={styles.totalsContent}>
            <p>Tarefas criadas <span>0</span></p>
            <p>Concluídas <span>0</span></p>
          </div>                    
      </div>   

      <div>
          <div className={styles.listEmpty}>
            <img src={todoLogo} alt="Lista de tarefas vazia" />   
            <p className={styles.listEmptyMsgInfo}>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>                    
      </div>   
    </>
  )
}
