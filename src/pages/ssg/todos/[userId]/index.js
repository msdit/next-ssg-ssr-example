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

export async function getStaticProps(ctx) {
  let todoList = await fetch(
    `https://jsonplaceholder.typicode.com/todos/?userId=${ctx.params.userId}`
  );
  todoList = await todoList.json();

  return {
    props: {
      todoList,
    },
  };
}

export async function getStaticPaths() {
  let todoList = await fetch("https://jsonplaceholder.typicode.com/todos/");
  todoList = await todoList.json();

  let userIdList = [];
  todoList.forEach((el) => {
    const userId = String(el.userId);
    if (!userIdList.includes(userId)) {
      userIdList.push(userId);
    }
  });

  return {
    paths: userIdList.map((userId) => ({
      params: { userId },
    })),
    fallback: false,
  };
}

export default TodoList;
