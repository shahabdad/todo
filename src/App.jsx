import axios from "axios";
import { useEffect, useState } from "react";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let data = await axios.get("https://dummyjson.com/todos?limit=10&skip=0");
    setTodos(data.data.todos);
  };

  const deleteTodo = async (id) => {
    let data = await axios.delete(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    });
    console.log(data);
    fetchTodos();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null); // Track todo being edited
  const [todo, setTitle] = useState("");

  const openModal = (todo = null) => {
    console.log(todo);
    setIsModalOpen(true);
    setCurrentTodo(todo);
    setTitle(todo ? todo.todo : "");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
    setTitle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todo == "") {
      alert("Please enter title");
      return false;
    }

    if (currentTodo == null) {
      try {
        let data = await axios.post("https://dummyjson.com/todos/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          userId: 5,
          body: {
            todo,
            completed: false,
          },
        });

        setTitle("");
        console.log(data);
        closeModal();
      } catch (e) {
        console.log(e.error);
      }
    } else {
      try {
        let udpated = await axios.put(
          `https://dummyjson.com/todos/${currentTodo.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: {
              completed: true,
            },
          }
        );

        console.log("updated record", udpated);
        closeModal();
      } catch (e) {
        console.log(e.error);
      }
    }
  };

  function status(status) {
    if (status) {
      return (
        <span className="bg-green-100 text-green-700 font-bold rounded px-3 py-1">
          Completed
        </span>
      );
    } else {
      return (
        <span className="bg-yellow-100 text-yellow-700 font-bold rounded px-3 py-1">
          Pending
        </span>
      );
    }
  }

  const { theme } = useTheme();

  

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <button
          className="bg-blue-600 rounded text-white py-2 px-3"
          onClick={() => openModal()}
        >
          Create
        </button>
        <h2 className="text-2xl font-semibold mb-4">Todos</h2>
        <div className="overflow-x-auto">
          <ThemeToggle />
          <table className={`min-w-full border border-gray-200 shadow-md rounded-lg ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} className="border-b border-gray-200">
                  <td className="py-4 px-6 text-left">{todo.todo}</td>
                  <td className="py-4 px-6 text-center">
                    {status(todo.completed)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => openModal(todo)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentTodo ? "Edit Todo" : "Add Todo"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  value={todo}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
