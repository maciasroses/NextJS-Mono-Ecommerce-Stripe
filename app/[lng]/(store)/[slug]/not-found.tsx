import { Card404 } from "@/app/shared/components";

const SearchNofFoundPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card404
        title="No results found"
        description="Try searching for something else"
      />
    </div>
  );
};

export default SearchNofFoundPage;
