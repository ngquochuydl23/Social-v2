import { isMobile } from "react-device-detect";
import { useIntl } from "react-intl";
import styles from "./likeDialog.module.scss";
import LikeList from "../LikeList";
import BaseDialog, { DialogProps } from "@components/Dialogs/BaseDialog";
import { useTheme } from "next-themes";

interface LikesDialogProps extends DialogProps {
  feedId?: number;
  isDetail?: boolean;
}

const LikesDialog: React.FC<LikesDialogProps> = ({ feedId, open, onClose, isDetail = false }) => {
  const intl = useIntl();
  const { theme } = useTheme();
  return (
    <BaseDialog
      open={open}
      backdropBg={theme === "light" ? "rgba(0, 0, 0, 0.8)" : undefined}
      fullScreen={isMobile}
      dialogHeaderProps={{
        text: `Likes`,
      }}
      onClose={onClose}>
      <div className={styles.likeDialog}>
        <LikeList feedId={feedId} />
      </div>
    </BaseDialog>
  );
};

export default LikesDialog;
