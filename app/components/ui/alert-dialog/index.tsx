import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import AlertAction from './alert-action';
import AlertCancel from './alert-cancel';
import AlertContent from './alert-content';
import AlertDescription from './alert-description';
import AlertFooter from './alert-footer';
import AlertHeader from './alert-header';
import AlertOverlay from './alert-overlay';
import AlertPortal from './alert-portal';
import AlertTitle from './alert-title';
import AlertTrigger from './alert-trigger';

function AlertDialog({ ...props }: AlertDialogPrimitive.AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root
      data-slot="alert-dialog"
      {...props}
    />
  );
}

AlertDialog.Action = AlertAction;
AlertDialog.Cancel = AlertCancel;
AlertDialog.Content = AlertContent;
AlertDialog.Description = AlertDescription;
AlertDialog.Footer = AlertFooter;
AlertDialog.Header = AlertHeader;
AlertDialog.Title = AlertTitle;
AlertDialog.Trigger = AlertTrigger;
AlertDialog.Overlay = AlertOverlay;
AlertDialog.Portal = AlertPortal;
export default AlertDialog;
