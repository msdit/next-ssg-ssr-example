import { Fragment } from "react";
import { useRouter } from "next/router";

const TodoList = ({ todoList }) => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      {todoList.map((todo) => (
        <Fragment key={todo.id}>
          <a href={`/ssr/todos/${userId}/${todo.id}`}>
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
