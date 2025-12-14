/**
 * Generate barcode string from leave data
 * Format: DDMMYYROLLNODDMMYYT
 * Example: 12052523P112130525D (19 chars)
 * 
 * @param {Date} startDate - Leave start date
 * @param {Date} endDate - Leave end date
 * @param {string} rollno - Student roll number
 * @param {string} studentType - HOSTELLER or DAYSCHOLAR
 * @returns {string} - Barcode string
 */
export const generateBarcodeString = (startDate, endDate, rollno, studentType) => {
    const formatDatePart = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).slice(-2);
        return `${day}${month}${year}`;
    };

    const startPart = formatDatePart(startDate);  // 6 chars:  DDMMYY
    const rollPart = rollno.slice(-6);             // 6 chars: last 6 of rollno
    const endPart = formatDatePart(endDate);       // 6 chars: DDMMYY
    const typePart = studentType === "HOSTELLER" ? "H" : "D";  // 1 char

    return `${startPart}${rollPart}${endPart}${typePart}`;
};

/**
 * Simple shuffle/obfuscate the barcode string
 * Makes it less readable but same length
 * 
 * @param {string} original - Original barcode string
 * @returns {string} - Shuffled string
 */
export const obfuscateBarcodeString = (original) => {
    // Simple character shift (Caesar cipher +3)
    const shifted = original.split('').map(char => {
        const code = char.charCodeAt(0);
        // Numbers 0-9
        if (code >= 48 && code <= 57) {
            return String.fromCharCode(((code - 48 + 3) % 10) + 48);
        }
        // Uppercase letters A-Z
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + 3) % 26) + 65);
        }
        return char;
    }).join('');

    return shifted;
};

/**
 * Decode/deobfuscate the barcode string
 * 
 * @param {string} obfuscated - Obfuscated barcode string
 * @returns {string} - Original string
 */
export const deobfuscateBarcodeString = (obfuscated) => {
    // Reverse character shift (Caesar cipher -3)
    const original = obfuscated.split('').map(char => {
        const code = char.charCodeAt(0);
        // Numbers 0-9
        if (code >= 48 && code <= 57) {
            return String.fromCharCode(((code - 48 - 3 + 10) % 10) + 48);
        }
        // Uppercase letters A-Z
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 - 3 + 26) % 26) + 65);
        }
        return char;
    }).join('');

    return original;
};

/**
 * Parse barcode string to extract data
 * 
 * @param {string} barcodeString - Decoded barcode string
 * @returns {Object} - Parsed data
 */
export const parseBarcodeString = (barcodeString) => {
    if (!barcodeString || barcodeString.length !== 19) {
        return { valid: false, error:  "Invalid barcode format" };
    }

    const startDateStr = barcodeString.slice(0, 6);   // DDMMYY
    const rollNo = barcodeString.slice(6, 12);         // 6 chars
    const endDateStr = barcodeString.slice(12, 18);    // DDMMYY
    const type = barcodeString.slice(18);              // H or D

    // Parse dates
    const parseDate = (str) => {
        const day = parseInt(str.slice(0, 2));
        const month = parseInt(str.slice(2, 4)) - 1;
        const year = 2000 + parseInt(str.slice(4, 6));
        return new Date(year, month, day);
    };

    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);
    const now = new Date();

    // Validate dates
    const isExpired = now > endDate;
    const isNotStarted = now < startDate;
    const isValid = ! isExpired && ! isNotStarted;

    return {
        valid:  isValid,
        rollNo:  rollNo,
        startDate: startDate,
        endDate: endDate,
        studentType: type === "H" ? "HOSTELLER" :  "DAYSCHOLAR",
        isExpired: isExpired,
        isNotStarted: isNotStarted,
        error: isExpired ? "Leave expired" : isNotStarted ? "Leave not started yet" : null
    };
};