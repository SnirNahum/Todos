import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TODOS_KEY = 'todosDB'

_createTodos()

export const todoService = {
    query,
    get,
    remove,
    save,
    getEmptyTodo,
}

function query(filterBy) {

    return storageService.query(TODOS_KEY)
        .then(todos => {
            if(filterBy === undefined) return todos

            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                todos = todos.filter(todo => regex.test(todo.title))
            }
            if (filterBy.isActive !== null) {
                todos = todos.filter(todo => todo.isActive === filterBy.isActive)
            }
            return todos
        })
}

function get(todoId) {
    return storageService.get(TODOS_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(TODOS_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODOS_KEY, todo)
    } else {
        return storageService.post(TODOS_KEY, todo, false)
    }
}

function getEmptyTodo(title = '', isActive = true) {
    return { _id: '', title, isActive }
}

function _createTodos() {
    let todos = utilService.loadFromStorage(TODOS_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTodo('Learn Vuex', true))
        todos.push(_createTodo('Play Katan', true))
        todos.push(_createTodo('Go to the beach', true))
        todos.push(_createTodo('Chill', false))
        utilService.saveToStorage(TODOS_KEY, todos)
    }
}

function _createTodo(title, isActive) {
    const todo = getEmptyTodo(title, isActive)
    todo._id = utilService.makeId()
    return todo
}