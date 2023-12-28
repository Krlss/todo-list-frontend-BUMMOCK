import { useAppSelector } from "../hooks/store";
import { useTaskActions } from "../hooks/useTaskActions";
import { FilterTasks } from "../store/taskSlice";

interface Props {
  remainingTasks: number;
}

export const TaskFilters = ({ remainingTasks = 0 }: Props) => {
  const { filter } = useAppSelector((state) => state.task);
  const { changeFilterTask } = useTaskActions();

  return (
    <div className="flex justify-between items-center mt-4 sm:flex-row flex-col">
      <div className="text-sm font-bold">Tasks remaining: {remainingTasks}</div>

      <div>
        <TaskFilter
          title={FilterTasks.all}
          filter={filter}
          setFilter={() => changeFilterTask(FilterTasks.all)}
        />
        <TaskFilter
          title={FilterTasks.active}
          filter={filter}
          setFilter={() => changeFilterTask(FilterTasks.active)}
        />
        <TaskFilter
          title={FilterTasks.completed}
          filter={filter}
          setFilter={() => changeFilterTask(FilterTasks.completed)}
        />
      </div>
    </div>
  );
};

interface PropsItem {
  title: FilterTasks;
  filter: FilterTasks;
  setFilter: (filter: FilterTasks) => void;
}
const TaskFilter = (props: PropsItem) => {
  const { title, filter, setFilter } = props;
  return (
    <button
      className={`mr-2 opacity-40 ${
        filter === title ? "underline font-semibold opacity-100" : ""
      }`}
      onClick={() => {
        setFilter(title);
      }}
    >
      {title}
    </button>
  );
};
