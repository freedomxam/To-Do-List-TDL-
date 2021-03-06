import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import tasks from './bd/task.json';
import FormC from './form';
import NavC from './nav';
import List from './list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.addTask(this.state.task, this.state.description, this.state.range);
  };

  //Setting initial state for new tasks
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addTask = (task, description, range) => {
    const newTask = {
      task: task,
      description: description,
      time: range || 12,
      id: this.state.tasks.length,
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
    });
  };

  //Delete task method
  deleteTask = (id) => {
    const procede = window.confirm('Are U sure ?');
    if (procede) {
      const newTasks = this.state.tasks.filter((task) => task.id !== id);
      this.setState({
        tasks: [...newTasks],
      });
    }
  };

  //Complete task method
  taskComplete = (id) => {
    const modifyTask = this.state.tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
        return task;
      } else {
        return task;
      }
    });
    this.setState({
      tasks: modifyTask,
    });
  };

  render() {
    return (
      <div>
        <NavC />
        <Container
          className="mt-4 rounded"
          fluid="md"
          style={{
            height: '85vh',
            backgroundColor: '#ccc',
          }}
        >
          <Row>
            <Col md={4}>
              <FormC
                state={this.state}
                click={this.handlerClick}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <h1 className="text-white mt-3">To Do List</h1>
              <hr className="text-white"></hr>
              <Container
                className="rounded"
                style={{
                  backgroundColor: '#ccb',
                  boxShadow: 'inset 1px 1px 11px 0px rgba(50, 46, 50, 0.55)',
                  height: '65vh',
                  overflowY: ' scroll',
                }}
              >
                {this.state.tasks.map((e) => (
                  <List
                    task={e.task}
                    description={e.description}
                    time={e.time}
                    done={e.done}
                    id={e.id}
                    clickToDelete={this.deleteTask.bind(this, e.id)}
                    clickToComplete={this.taskComplete.bind(this, e.id)}
                  />
                ))}
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
