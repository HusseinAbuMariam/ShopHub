import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); 
    } else {
      navigate("/"); 
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      ←
    </button>
  );
}   