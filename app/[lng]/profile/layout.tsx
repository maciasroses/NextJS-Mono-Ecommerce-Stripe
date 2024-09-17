const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>PROFILE HEADER</div>
      {children}
    </>
  );
};

export default ProfileLayout;
