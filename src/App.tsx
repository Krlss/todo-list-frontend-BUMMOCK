import { TaskFilters } from "./components/TaskFilters";
import { TaskList } from "./components/TaskList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useApp } from "./hooks/useApp";

const App = () => {
  const {
    handleAddTask,
    handleAddTaskEnter,
    remainingTasks,
    setTask,
    task,
    tasks,
  } = useApp();
  return (
    <div className="h-screen w-full max-w-3xl m-auto px-10 md:px-0">
      <div className="fixed bg-white max-w-3xl md:w-full w-5/6 z-10">
        <div className="flex items-center justify-center gap-x-1">
          <input
            type="text"
            className="w-full border-b-4 border-dotted text-3xl focus:opacity-75 focus:outline-none pt-2 pb-1"
            placeholder="What needs to be done?"
            onKeyDown={handleAddTaskEnter}
            maxLength={150}
            autoFocus
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {task && (
            <Icon
              icon="gala:add"
              width={27}
              className="opacity-45 hover:opacity-100"
              onClick={handleAddTask}
            />
          )}
        </div>

        {tasks.length > 0 && <TaskFilters remainingTasks={remainingTasks} />}
      </div>

      <TaskList />
    </div>
  );
};

export default App;
