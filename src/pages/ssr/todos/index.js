import { Fragment } from "react";

const TodoList = ({ todoList }) => {
  return (
    <>
      {todoList.map((todo) => (
        <Fragment key={todo.id}>
          <a href={`/todos/${todo.id}`}>{todo.title}</a>
          <hr />
        </Fragment>
      ))}
    </>
  );
};

export async function getServerSideProps() {
  let todoList = await fetch("https://jsonplaceholder.typicode.com/todos/");
  todoList = await todoList.json();

  return {
    props: {
      todoList,
    },
  };
}

export default TodoList;
