const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-[1440px] mx-auto text-center p-4">
        <p>&copy; {currentYear} - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
