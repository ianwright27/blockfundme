import "../App.css";

export default function Hero() {
  return (
    <div className="container-fluid border-hero hero d-flex align-items-center justify-content-center">
      <div className="row d-flex">
        <div className="col-md-12 col-sm-6 col-xs-6 p-5 m-auto">
          <h1 className="title">
            Welcome to <span className="special-logo">BlockFundMe</span>💸
          </h1>
        </div>
      </div>
    </div>
  );
}
