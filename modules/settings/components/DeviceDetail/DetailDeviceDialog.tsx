import BaseDialog from "@components/Dialogs/BaseDialog";
import { BaseDialogHeader } from "@components/Dialogs/BaseDialog";
import { DialogProps } from "@components/Dialogs/BaseDialog";
import { DeviceDto } from "services/DeviceService/dtos";
import DetailDeviceView from "./DeviceDetailView";

interface DeviceDetailDialogProps extends DialogProps {
  device: DeviceDto
}

const DeviceDetaiDialog: React.FC<DeviceDetailDialogProps> = ({
  open,
  onClose,
  device
}) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      showBaseHeader={false}
      isPadding={false}>
      <div style={{ borderRadius: '20px' }}>
        <BaseDialogHeader
          textRightButton='Cancel'
          rightButtonClick={onClose}
          text="Device Detail"
          onButtonClose={onClose} />
        <div style={{ padding: '20px' }}>
          <DetailDeviceView {...device} />
        </div>
      </div>
    </BaseDialog>
  )
}

export default DeviceDetaiDialog;