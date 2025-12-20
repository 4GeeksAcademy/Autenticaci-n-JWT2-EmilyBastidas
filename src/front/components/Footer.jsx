export const Footer = () => {
  return (
    <footer className="footer text-white py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0 text-black">
          &copy; {new Date().getFullYear()} Authentication JWT
        </div>
        <div>
          <a href="/" className="text-black me-3 text-decoration-none">Inicio</a>
          <a href="/signup" className="text-black me-3 text-decoration-none">Registro</a>
          <a href="/login" className="text-black text-decoration-none">Login</a>
        </div>
      </div>
    </footer>
  );
};

