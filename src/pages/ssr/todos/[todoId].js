const TodoItem = ({ todoItem }) => {
  return <div>todo: {JSON.stringify(todoItem)}</div>;
};

export async function getServerSideProps(ctx) {
  let todoItem = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${ctx.query.todoId}`
  );
  todoItem = await todoItem.json();

  return {
    props: {
      todoItem,
    },
    notFound: typeof todoItem.id === "undefined",
  };
}

export default TodoItem;
