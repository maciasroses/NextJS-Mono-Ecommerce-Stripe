import { randomInt } from "crypto";

const CustomListsListSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: randomInt(3, 6) }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
        >
          <div className="flex justify-between items-center gap-4">
            <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          </div>
          <div className="flex justify-between items-center gap-4 mt-4">
            <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomListsListSkeleton;
