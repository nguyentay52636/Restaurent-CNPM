import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IUserDataType } from "@/lib/apis/types.";

interface DialogDeleteConfirmationProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: IUserDataType | null;
    onConfirm: (user: IUserDataType) => void;
}

export function DialogDeleteConfirmation({
    open,
    onOpenChange,
    user,
    onConfirm,
}: DialogDeleteConfirmationProps) {
    if (!user) return null;

    const handleConfirm = () => {
        onConfirm(user);
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa tài khoản</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa tài khoản
                        <strong className="mx-1">{user.email}</strong>
                        không? Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        Xóa tài khoản
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 