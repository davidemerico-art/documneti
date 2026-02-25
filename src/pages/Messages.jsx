import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTelegramPlane, FaArrowLeft } from "react-icons/fa";

function Messages() {
  const navigate = useNavigate();

  const handleEmail = () => {
    alert("Invio email (qui collegherai il backend)");
  };

  const handleTelegram = () => {
    alert("Invio Telegram (qui collegherai il backend)");
  };

  return (
    <div className="container">
      <h2>Invia Messaggi</h2>

      <div className="card">
        <p>
          Qui potrai inviare messaggi Email o Telegram ai destinatari
          associati ai tuoi documenti.
        </p>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "40px",
            justifyContent: "center",
          }}
        >
          <FaEnvelope
            size={35}
            style={{ cursor: "pointer", color: "#4b0082" }}
            onClick={handleEmail}
            title="Invia Email"
          />

          <FaTelegramPlane
            size={35}
            style={{ cursor: "pointer", color: "#4b0082" }}
            onClick={handleTelegram}
            title="Invia Telegram"
          />
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <FaArrowLeft
            size={20}
            style={{ cursor: "pointer", color: "#4b0082" }}
            onClick={() => navigate("/")}
            title="Torna alla Home"
          />
        </div>
      </div>
    </div>
  );
}

export default Messages;