import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Success() {
  return (
    <>
      <h2>Successfully logged in!</h2>
      <Link to="/">Ana sayfaya dön</Link>
    </>
  );
}
