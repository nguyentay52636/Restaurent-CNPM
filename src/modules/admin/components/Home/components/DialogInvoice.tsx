import { AlertDialog, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter } from '@/components/ui/alert-dialog'
import React from 'react'

export default function DialogInvoice({
    showInvoiceDialog,
    setShowInvoiceDialog,
    handleSkipInvoice,
    handlePrintInvoice,
}: {
    showInvoiceDialog: boolean;
    setShowInvoiceDialog: (showInvoiceDialog: boolean) => void;
    handleSkipInvoice: () => void;
    handlePrintInvoice: () => void;
}) {
    return (
        <>
            <AlertDialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>In hóa đơn</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có muốn in hóa đơn cho đơn hàng này không?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleSkipInvoice}>Bỏ qua</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePrintInvoice}>In hóa đơn</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
