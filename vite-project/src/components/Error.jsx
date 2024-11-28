import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

export default function ErrorPage() {
  const history = useHistory();

  return (
    <div className="error-container">
      <h2>Yanlış giriş yaptınız. Tekrar deneyiniz.</h2>
      <br />
      <Button color="primary" onClick={() => history.push("/")}>
        Tekrar Dene
      </Button>
    </div>
  );
}
