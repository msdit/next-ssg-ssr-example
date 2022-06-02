import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const TodoList = ({ todoList }) => {
  const router = useRouter();
  const { userId } = router.query;

  const goToPage = (pageId) => {
    router.push(`/ssg/todos/${userId}/${pageId}`);
  };

  return (
    <>
      {todoList.map((todo) => (
        <Fragment key={todo.id}>
          <Link href={`/ssg/todos/${userId}/${todo.id}`} prefetch={false}>
            <a target="_blank">
              {todo.id}. {todo.title}
            </a>
          </Link>
          <button onClick={() => goToPage(todo.id)}>
            Go to page {todo.id}
          </button>
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
