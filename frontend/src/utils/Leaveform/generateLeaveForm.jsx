import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ===================================================================================
//
//  HELPER FUNCTIONS
//
// ===================================================================================

/**
 * Fetches an image and converts it to a Base64 string for embedding in the PDF.
 */
const imageUrlToBase64 = async (url) => {
    if (!url) return null;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(`Error converting image URL to Base64: ${url}`, error);
        return null;
    }
};

/**
 * Formats a date string to DD/MM/YYYY.
 */
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
};

/**
 * Calculates the number of days for the leave period.
 */
const calculateNumberOfDays = (startDateString, endDateString) => {
    if (!startDateString || !endDateString) return 0;
    const start = new Date(startDateString);
    const end = new Date(endDateString);
    const timeDiff = end.getTime() - start.getTime();
    if (isNaN(timeDiff) || timeDiff < 0) return 0;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return dayDiff;
};

export const generateLeaveForm = async (leave) => {
    if (!leave) {
        console.error("Leave data is missing. Cannot generate PDF.");
        return;
    }

    // --- PASTE YOUR BASE64 LOGO STRING HERE ---
    // Example: const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...';
    const logoBase64 = await imageUrlToBase64('/KCE.png');

    // --- 1. Load Signatures (if approved) ---
    let tutorSignatureBase64 = null;
    let seniorMentorSignatureBase64 = null;

    if (leave.status === 'Approved') {
        // Fetch both signatures concurrently for better performance
        [tutorSignatureBase64, seniorMentorSignatureBase64] = await Promise.all([
            imageUrlToBase64('/temp/shankarSign.png'),    // Tutor's signature
            imageUrlToBase64('/temp/dhanushSign.png')     // Senior Mentor's signature
        ]);
        console.log("Fetched signatures for approved leave:", {
            tutorSignatureBase64,
            seniorMentorSignatureBase64
        });
    }

    const doc = new jsPDF();
    const page_width = doc.internal.pageSize.getWidth();
    const leftMargin = 14;

    // --- 2. PDF Header with Logo ---
    if (logoBase64 && logoBase64.startsWith('data:image')) {
        const logoWidth = 120; // Adjusted for a wide logo
        const logoHeight = 28; // Maintain aspect ratio
        const logoX = (page_width - logoWidth) / 2;
        doc.addImage(logoBase64, 'PNG', logoX, 15, logoWidth, logoHeight);
    } else {
        // Fallback to text if logo is not provided
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('KARPAGAM COLLEGE OF ENGINEERING', page_width / 2, 20, { align: 'center' });
    }

    // Adjusted Y position for the title to be below the logo
    const titleY = 55;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LEAVE FORM', page_width / 2, titleY, { align: 'center' });

    // --- 3. Student and Leave Info ---
    // Adjusted Y position for the info section
    const infoStartY = titleY + 10;
    const studentName = leave.applicantId?.name || 'N/A';
    const rollNo = leave.applicantId?.rollno || 'N/A';
    const department = leave.classId?.department || 'N/A';
    const year = leave.classId?.year || 'N/A';
    const section = leave.classId?.section || '';
    const appliedDate = formatDate(leave.appliedAt);
    const departmentText = `${year} ${department} - '${section}'`;
    doc.setFontSize(11);
    const col1_label_x = leftMargin + 2;
    const col1_colon_x = 57;
    const col2_label_x = 145;
    const col2_colon_x = 170;
    const drawAlignedField = (y, label, value, labelX, colonX) => { doc.setFont('helvetica', 'bold'); doc.text(label, labelX, y); doc.text(':', colonX, y); doc.setFont('helvetica', 'normal'); doc.text(value, colonX + 3, y); };
    drawAlignedField(infoStartY, 'Name of the Student', studentName, col1_label_x, col1_colon_x);
    drawAlignedField(infoStartY + 8, 'Roll Number', rollNo, col1_label_x, col1_colon_x);
    drawAlignedField(infoStartY, 'Date', appliedDate, col2_label_x, col2_colon_x);
    drawAlignedField(infoStartY + 8, 'Department', departmentText, col2_label_x, col2_colon_x);
    const numberOfDays = calculateNumberOfDays(leave.startDate, leave.endDate);
    const leaveDates = `${formatDate(leave.startDate)} to ${formatDate(leave.endDate)}`;
    autoTable(doc, { startY: infoStartY + 17, head: [['No of days leave required', 'Date(s) of leave', 'No of days leave already taken']], body: [[`${numberOfDays} ${numberOfDays > 1 ? 'Days' : 'Day'}`, leaveDates, '-']], theme: 'grid', styles: { fontSize: 11, cellPadding: 3, halign: 'center' }, headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' } });
    let finalY = doc.lastAutoTable.finalY;
    autoTable(doc, { startY: finalY + 10, head: [['Reason for Leave']], body: [[leave.reason]], theme: 'grid', styles: { fontSize: 11, cellPadding: 4, fontStyle: 'italic' }, headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }, didParseCell: (data) => { if (data.section === 'body') data.cell.styles.minCellHeight = 20; } });
    finalY = doc.lastAutoTable.finalY;

    // --- 4. Signature Section (Corrected Layout) ---
    const sigY = finalY + 20; // Y position for the signature images
    const textY = sigY + 5;   // Y position for the text lines below the images

    const tutorName = leave.classId?.tutorIds?.[0]?.name || 'N/A';
    const seniorMentorName = 'Dr. Prabakar'; // As requested in the image

    // Place Signature Images (only if approved)
    if (leave.status === 'Approved') {
        if (tutorSignatureBase64) {
            doc.addImage(tutorSignatureBase64, 'PNG', leftMargin, sigY - 15, 50, 20);
        }
        if (seniorMentorSignatureBase64) {
            doc.addImage(seniorMentorSignatureBase64, 'PNG', 140, sigY - 15, 50, 20);
        }
    }

    // Place Signature Text
    // Left Side: Class Tutor
    doc.text(tutorName, leftMargin + 10, textY);
    doc.text("(Class Tutor Signature)", leftMargin + 10, textY + 5);

    // Right Side: Senior Mentor
    doc.text(seniorMentorName, 150, textY);
    doc.text("(Senior Mentor Signature)", 150, textY + 5);

    // --- 5. Save the PDF ---
    doc.save(`Leave_Form_${rollNo}.pdf`);
};

/*
const leaveForm = {
    _id: "6873d4405c0473015c4d5567",
    applicantId: {
        _id: "6873cdca0069d5c88a1e5d4f",
        name: "Praveen M",
        rollno: "717823P243"
    },
    classId: {
        _id: "6873cbd40069d5c88a1e5d3b",
        tutorIds: [
            {
                _id: "6872c30ca3f07310ca1d7a1f",
                name: "Dr. Rajapriya"
            }
        ],
        department: "CSE",
        year: "III",
        section: "B"
    },
    startDate: "2025-07-14T00:00:00.000Z",
    endDate: "2025-07-16T00:00:00.000Z",
    reason: "Marriage Function",
    status: "Approved",
    appliedAt: "2025-07-13T15:44:00.693Z",
    __v: 0
};
*/
