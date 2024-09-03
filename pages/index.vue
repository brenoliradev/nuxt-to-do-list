<script lang="ts" setup>
    import type { z } from 'zod';

    import { toDo } from '~/lib/schemas';

    const toDoAction = useState<string>('todo-action', () => "")
    const toDoList = useState<z.infer<typeof toDo>[]>('todo-list', () => [])

    const formSubmit = (e: Event) => {
        e.preventDefault();

        const parsed = toDo.parse({
            action: toDoAction.value,
            id: String(toDoList.value.length + 1),
            done: false
        })

        if (parsed.id) {
            toDoList.value.push(parsed)

            toDoAction.value = "";
        }
    }

    const deleteTodo = (id: z.infer<typeof toDo>['id']) => {
        toDoList.value = toDoList.value.filter((t) => t.id !== id)
    }
</script>

<template>
    <section class="h-screen w-screen bg-black flex flex-col items-center pt-5">
        <h2 class="text-white">To do list</h2>
        <form class="p-3 flex max-w-3xl w-full" @submit="formSubmit">
            <Input required v-model="toDoAction" class="bg-white rounded-r-none" placeholder="What you'll do?"/>
            <Button class="rounded-l-none">Submit</Button>
        </form>
        <div v-if="toDoList.length" class="max-w-3xl flex flex-col gap-2 w-full">
            <div v-for="item in toDoList" :key="item.id" class="flex items-center space-x-2 bg-white p-3 rounded-sm">
                <Button @click="() => item.done = !item.done" variant="ghost" class="w-full flex justify-start gap-2">
                    <Checkbox :id="item.id" v-model:checked="item.done" tabindex="-1" />
                    <label
                        :for="item.id"
                        class="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        :class="{
                            'line-through italic': item.done
                        }"
                    >
                        {{ item.action }}
                    </label>
                </Button>
                <Button class="w-10 p-0 px-3" variant="ghost" @click="() => deleteTodo(item.id)"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg></Button>
            </div>
        </div>
    </section>
</template>