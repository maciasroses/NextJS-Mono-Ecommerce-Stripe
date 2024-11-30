import { Card404 } from "@/app/shared/components";

const SearchNofFoundPage = () => {
  return (
    <div>
      <Card404
        title="Custom List Not Found"
        description="The custom list you are looking for does not exist."
      />
    </div>
  );
};

export default SearchNofFoundPage;
