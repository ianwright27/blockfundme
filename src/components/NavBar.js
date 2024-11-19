export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <b>BFM</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  `How it works`
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  `Features`
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link bg-success text-light retro-btn my-retro-btn"
                  href="#"
                >
                  Does it cost anything?
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
