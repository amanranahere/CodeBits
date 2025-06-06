import { useNavigate } from "react-router-dom";
import ModalOverlay from "../Modals/ModalOverlay";
import SettingsModal from "../Modals/SettingsModal";

export default function SettingsRouteWrapper() {
  const navigate = useNavigate();

  return (
    <ModalOverlay onClose={() => navigate(-1)}>
      <SettingsModal />
    </ModalOverlay>
  );
}
