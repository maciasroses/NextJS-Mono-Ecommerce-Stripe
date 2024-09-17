import Link from "next/link";

const ErrorCard = ({ isComponent = false }: { isComponent?: boolean }) => {
  return (
    <div className="p-4 text-center">
      <p className="text-5xl pb-4">X</p>
      <strong className="text-3xl">Something went wrong</strong>
      <p className="text-2xl">We are working to get it working again</p>
      {!isComponent && (
        <Link className="text-lg text-primary-dark pt-2" href="/">
          Go home
        </Link>
      )}
    </div>
  );
};

export default ErrorCard;
