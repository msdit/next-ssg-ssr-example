import { Fragment } from "react";

const TodoList = ({ todoList }) => {
  return (
    <>
      {todoList.map((todo) => (
        <Fragment key={todo.id}>
          <a href={`/todos/${todo.id}`}>
            {todo.id}. {todo.title}
          </a>
          <hr />
        </Fragment>
      ))}
    </>
  );
};

export async function getServerSideProps(ctx) {
  let todoList = await fetch(
    `https://jsonplaceholder.typicode.com/todos/?userId=${ctx.query.userId}`
  );
  todoList = await todoList.json();

  return {
    props: {
      todoList,
    },
  };
}

export default TodoList;
