import { useRouter } from "next/router";

const TodoItem = ({ todoItem }) => {
  const router = useRouter();
  console.log(router);
  
  return <div>todo: {JSON.stringify(todoItem)}</div>;
};

export async function getStaticProps(ctx) {
  let todoItem = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${ctx.params.todoId}`
  );
  todoItem = await todoItem.json();

  return {
    props: {
      todoItem,
    },
    notFound: !todoItem.id,
  };
}

export async function getStaticPaths() {
  let todoList = await fetch("https://jsonplaceholder.typicode.com/todos/");
  todoList = await todoList.json();

  return {
    paths: [
      { params: { todoId: "1" } },
      { params: { todoId: "2" } },
      { params: { todoId: "3" } },
    ],
    // paths: todoList.map((todo) => ({
    //   params: { todoId: String(todo.id) },
    // })),
    fallback: true, // false = return 404 if not found
  };
}

export default TodoItem;
