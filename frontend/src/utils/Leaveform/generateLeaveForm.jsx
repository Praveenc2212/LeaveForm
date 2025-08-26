import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Correctly import the autoTable function

// Helper function to format dates, ensuring consistency
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
};

const calculateNumberOfDays = (startDateString, endDateString) => {
    if (!startDateString || !endDateString) return 0;
    const start = new Date(startDateString);
    const end = new Date(endDateString);
    const timeDiff = end.getTime() - start.getTime();
    if (isNaN(timeDiff) || timeDiff < 0) return 0;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff + 1;
};

/**
 * Generates a leave proof PDF that mimics the physical college form.
 * @param {object} leave - The leave data object.
 */
export const generateLeaveForm = (leave) => {
    const doc = new jsPDF();

    // --- 1. Header ---
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('KARPAGAM COLLEGE OF ENGINEERING', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('(Autonomous, Affiliated to Anna University, Chennai)', doc.internal.pageSize.getWidth() / 2, 26, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LEAVE FORM', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

    // --- 2. Student & Date Info ---
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name of the Student: ${leave.applicantId.name}`, 14, 60);
    doc.text(`Date: ${formatDate(leave.appliedAt)}`, 150, 60);
    doc.text(`Roll Number: ${leave.applicantId.rollno}`, 14, 68);

    // --- 3. Leave Details Table ---
    const numberOfDays = calculateNumberOfDays(leave.startDate, leave.endDate);
    const leaveDates = `${formatDate(leave.startDate)} to ${formatDate(leave.endDate)}`;
    
    // THE FIX: Call autoTable as a function, passing the doc instance
    autoTable(doc, {
        startY: 75,
        head: [['No of days leave required', 'Date(s) of leave', 'No of days leave already taken']],
        body: [[`${numberOfDays} ${numberOfDays > 1 ? 'Days' : 'Day'}`, leaveDates, '-']],
        theme: 'grid',
        styles: {
            fontSize: 11,
            cellPadding: 3,
            halign: 'center',
        },
        headStyles: {
            fillColor: [230, 230, 230], // Light gray for header
            textColor: [0, 0, 0],
        },
    });

    // --- 4. Reason for Leave ---
    // Use the 'lastAutoTable' property from the doc object itself
    const finalY = doc.lastAutoTable.finalY;
    doc.text('Reason for Leave:', 14, finalY + 15);
    doc.setFont('helvetica', 'italic');
    doc.text(leave.reason, 16, finalY + 22, { maxWidth: 180 });
    doc.setFont('helvetica', 'normal');

    // --- 5. Approval Status (Digital Equivalent of Signatures) ---
    doc.setLineWidth(0.5);
    doc.rect(14, finalY + 35, 182, 30); // A box for the approval section
    doc.setFont('helvetica', 'bold');
    doc.text('Approval Status', 16, finalY + 42);
    doc.setFont('helvetica', 'normal');
    doc.text(`- Staff Reviewed: Yes (on ${formatDate(leave.reviewedAt || leave.appliedAt)})`, 20, finalY + 50);
    doc.text(`- HOD Approved: Yes (on ${formatDate(leave.approvedAt)})`, 20, finalY + 57);
    
    // --- 6. Placeholder Signature Lines (to maintain form structure) ---
    const sigY = finalY + 80;
    doc.line(14, sigY + 5, 64, sigY + 5);
    doc.text('Tutor', 14, sigY + 10);
    
    doc.line(140, sigY + 5, 190, sigY + 5);
    doc.text('Senior Mentor', 140, sigY + 10);
    
    // --- 7. Save the PDF ---
    doc.save(`Leave_Proof_${leave.applicantId.rollno}.pdf`);
};