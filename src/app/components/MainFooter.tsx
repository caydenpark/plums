const React = require("react");
const { Link } = require("react-router-dom");

const MainFooter = () => {
  return (
    <footer>
      <p>© 2022 My Website</p>
      <Link to="/privacy-policy">Privacy Policy</Link>
    </footer>
  );
};

module.exports = MainFooter;