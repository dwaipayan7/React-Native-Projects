import {queryOptions} from '@tanstack/react-query'

type Todo = {
    userId: string,
    id: number,
    title: string,
    completed: boolean
}

export default function createTodoQueryOptions() {
    return queryOptions({
        queryKey: ['todos'],
        queryFn: () => getTodos(),
    })
}


const getTodos = async() : Promise<Todo[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    return res.json();
}