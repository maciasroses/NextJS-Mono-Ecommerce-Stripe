const formatdateInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export default formatdateInput;
