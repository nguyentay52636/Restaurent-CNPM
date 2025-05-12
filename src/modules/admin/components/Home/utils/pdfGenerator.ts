import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { addFonts } from '../pages/pdfFonts';

// Define the OrderItem interface
export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Customer {
    id: number;
    name: string;
    address: string;
    spent: number;
}

export interface InvoiceData {
    invoiceNumber: number;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    charges: number;
    finalTotal: number;
    selectedCustomer: Customer | null;
    pointsToAdd: number;
}

// Function to generate PDF invoice
export const generatePDF = (data: InvoiceData): void => {
    try {
        // Create new PDF document with custom font support
        const doc = new jsPDF();

        // Add font support
        addFonts(doc);

        const currentDate = new Date().toLocaleDateString('vi-VN');
        const currentTime = new Date().toLocaleTimeString('vi-VN');

        // Add logo and header
        doc.setFontSize(22);
        doc.setTextColor(33, 150, 243);
        doc.text('RESTAURANT', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text('123 Duong Am Thuc, Quan 1, TP.HCM', 105, 28, { align: 'center' });
        doc.text('SDT: 0123 456 789 | Email: info@restaurant.com', 105, 34, { align: 'center' });

        // Add invoice details
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text('HOA DON', 70, 50);
        doc.text(`#${data.invoiceNumber}`, 120, 50);

        doc.setFontSize(10);
        doc.text(`Ngay: ${currentDate}`, 20, 58);
        doc.text(`Thoi gian: ${currentTime}`, 20, 64);

        // Add customer details if available
        let tableStartY = 74;

        if (data.selectedCustomer) {
            doc.setFontSize(12);
            doc.text('Thong tin khach hang:', 20, 74);
            doc.setFontSize(10);
            doc.text(`Ten: ${data.selectedCustomer.name}`, 25, 81);
            doc.text(`Dia chi: ${data.selectedCustomer.address}`, 25, 87);
            doc.text(`Tich diem: +${data.pointsToAdd.toLocaleString('vi-VN')} d`, 25, 93);
            tableStartY = 100;
        }

        // Create table for order items with improved formatting
        autoTable(doc, {
            startY: tableStartY,
            head: [['STT', 'San pham', 'So luong', 'Don gia', 'Thanh tien']],
            body: data.items.map((item, index) => [
                index + 1,
                item.name,
                item.quantity,
                `${item.price.toLocaleString('vi-VN')} d`,
                `${(item.price * item.quantity).toLocaleString('vi-VN')} d`
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [251, 146, 60],
                textColor: [255, 255, 255],
                halign: 'center',
                fontStyle: 'bold'
            },
            columnStyles: {
                0: { halign: 'center', cellWidth: 15 },
                1: { halign: 'left' },
                2: { halign: 'center', cellWidth: 25 },
                3: { halign: 'right', cellWidth: 30 },
                4: { halign: 'right', cellWidth: 35 }
            },
            styles: {
                overflow: 'linebreak'
            },
            margin: { top: 20 }
        });

        // Add payment summary
        const finalY = (doc as any).lastAutoTable.finalY + 10;

        doc.setFontSize(10);
        doc.text('Tam tinh:', 130, finalY);
        doc.text(`${data.subtotal.toLocaleString('vi-VN')} d`, 175, finalY, { align: 'right' });

        doc.text('Thue:', 130, finalY + 7);
        doc.text(`${data.tax.toLocaleString('vi-VN')} d`, 175, finalY + 7, { align: 'right' });

        doc.text('Phi dich vu:', 130, finalY + 14);
        doc.text(`${data.charges.toLocaleString('vi-VN')} d`, 175, finalY + 14, { align: 'right' });

        // Draw a line
        doc.setDrawColor(200);
        doc.line(130, finalY + 17, 175, finalY + 17);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Tong cong:', 130, finalY + 24);
        doc.text(`${data.finalTotal.toLocaleString('vi-VN')} d`, 175, finalY + 24, { align: 'right' });

        // Add footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Cam on quy khach da su dung dich vu cua nha hang!', 105, finalY + 40, { align: 'center' });
        doc.text('Hen gap lai quy khach trong thoi gian som nhat!', 105, finalY + 46, { align: 'center' });

        // Save the PDF
        doc.save(`hoa-don-${data.invoiceNumber}.pdf`);
        
        return;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    }
}; 