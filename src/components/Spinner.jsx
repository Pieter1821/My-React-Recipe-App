
import '../styles/Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Spinner;
