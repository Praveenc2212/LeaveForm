/**
 * ============================================================
 * BARCODE UTILITY FUNCTIONS
 * ============================================================
 * 
 * Barcode Format:  DDMMYY + ROLLNO(6) + DDMMYY + T = 19 chars
 * 
 * Structure:
 * - Generated Date (DDMMYY) - 6 chars - When HOD approved/barcode created
 * - Roll Number (last 6) - 6 chars - e.g., "23P112"
 * - Leave Start Date (DDMMYY) - 6 chars - When leave starts
 * - Type (H/D) - 1 char - Hosteller or Day Scholar
 * 
 * Example: 
 * Generated:  13/12/2025, Roll: 717823P112, Start: 15/12/2025, Type: Day Scholar
 * Result: 13122523P112151225D (19 chars)
 * Encrypted: 46455856V445484558G (19 chars)
 */

// ============================================================
// FUNCTION 1: GENERATE & ENCRYPT BARCODE
// ============================================================

/**
 * Generate and encrypt barcode string from leave data
 * 
 * @param {Object} params - Parameters object
 * @param {string} params.rollno - Full roll number (e. g., "717823P112")
 * @param {Date|string} params.startDate - Leave start date
 * @param {string} params.studentType - "HOSTELLER" or "DAYSCHOLAR"
 * @returns {string} - Encrypted barcode string (19 chars)
 * @throws {Error} - If any required parameter is missing or invalid
 */
export const generateEncryptedBarcode = ({ rollno, startDate, studentType }) => {
    // Validate inputs
    if (!rollno || typeof rollno !== "string") {
        throw new Error("Invalid roll number");
    }
    if (!startDate) {
        throw new Error("Invalid start date");
    }
    if (! studentType || !["HOSTELLER", "DAYSCHOLAR"].includes(studentType)) {
        throw new Error("Invalid student type.  Must be 'HOSTELLER' or 'DAYSCHOLAR'");
    }

    // Helper:  Format date to DDMMYY
    const formatDateToDDMMYY = (date) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            throw new Error("Invalid date format");
        }
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).slice(-2);
        return `${day}${month}${year}`;
    };

    // Build barcode parts
    const generatedDate = formatDateToDDMMYY(new Date());  // Today's date (HOD approval date)
    const rollPart = rollno.slice(-6).toUpperCase();       // Last 6 chars of roll number
    const startDatePart = formatDateToDDMMYY(startDate);   // Leave start date
    const typePart = studentType === "HOSTELLER" ?  "H" : "D";

    // Validate roll part length
    if (rollPart.length !== 6) {
        throw new Error("Roll number must have at least 6 characters");
    }

    // Combine:  DDMMYY + ROLLNO(6) + DDMMYY + T = 19 chars
    const plainBarcode = `${generatedDate}${rollPart}${startDatePart}${typePart}`;

    // Encrypt (Caesar cipher +3)
    const encryptedBarcode = encrypt(plainBarcode);

    return encryptedBarcode;
};

// ============================================================
// FUNCTION 2: VALIDATE & DECRYPT BARCODE
// ============================================================

/**
 * Validate and decrypt barcode string
 * 
 * Validation Rules:
 * - Barcode generated date must be within 1 day from today (before or after)
 * - If outside this window, barcode is invalid
 * 
 * @param {string} encryptedBarcode - Encrypted barcode string
 * @returns {Object} - Validation result
 * 
 * If INVALID:
 * {
 *   isValid: false,
 *   message: "Reason why invalid"
 * }
 * 
 * If VALID:
 * {
 *   isValid: true,
 *   rollNumber: "717823P112",
 *   generatedDate: Date object (HOD approved date),
 *   leaveStartDate: Date object,
 *   studentType: "HOSTELLER" or "DAYSCHOLAR"
 * }
 */
export const validateAndDecryptBarcode = (encryptedBarcode) => {
    // Check if barcode exists
    if (!encryptedBarcode || typeof encryptedBarcode !== "string") {
        return {
            isValid: false,
            message:  "Barcode is empty or invalid"
        };
    }

    // Check length
    if (encryptedBarcode.length !== 19) {
        return {
            isValid:  false,
            message: "Invalid barcode format - incorrect length"
        };
    }

    // Decrypt
    const plainBarcode = decrypt(encryptedBarcode);

    // Parse parts
    const generatedDateStr = plainBarcode.slice(0, 6);    // DDMMYY
    const rollPart = plainBarcode.slice(6, 12);            // 6 chars (e.g., "23P112")
    const startDateStr = plainBarcode.slice(12, 18);       // DDMMYY
    const typePart = plainBarcode.slice(18);               // H or D

    // Validate type
    if (typePart !== "H" && typePart !== "D") {
        return {
            isValid:  false,
            message: "Invalid barcode - corrupted data"
        };
    }

    // Parse dates
    const parseDate = (str) => {
        const day = parseInt(str.slice(0, 2), 10);
        const month = parseInt(str.slice(2, 4), 10) - 1;
        const year = 2000 + parseInt(str.slice(4, 6), 10);
        return new Date(year, month, day);
    };

    const generatedDate = parseDate(generatedDateStr);
    const leaveStartDate = parseDate(startDateStr);

    // Validate parsed dates
    if (isNaN(generatedDate.getTime()) || isNaN(leaveStartDate.getTime())) {
        return {
            isValid:  false,
            message: "Invalid barcode - corrupted date"
        };
    }

    // Check if generated date is within 1 day from today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const genDateOnly = new Date(generatedDate);
    genDateOnly.setHours(0, 0, 0, 0);

    const diffInMs = today.getTime() - genDateOnly.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // Valid if generated date is within -1 to +1 day from today
    // i.e., yesterday, today, or tomorrow
    if (diffInDays > 1) {
        return {
            isValid:  false,
            message: "Barcode expired - generated more than 1 day ago"
        };
    }

    if (diffInDays < -1) {
        return {
            isValid: false,
            message:  "Invalid barcode - generated date is in future"
        };
    }

    // Reconstruct full roll number
    const fullRollNumber = `7178${rollPart}`;

    // Return valid result
    return {
        isValid:  true,
        rollNumber: fullRollNumber,
        generatedDate: generatedDate,
        leaveStartDate: leaveStartDate,
        studentType: typePart === "H" ? "HOSTELLER" :  "DAYSCHOLAR"
    };
};

// ============================================================
// HELPER FUNCTIONS (Internal - Not Exported)
// ============================================================

/**
 * Encrypt string using Caesar cipher (+3 shift)
 * @param {string} plain - Plain text
 * @returns {string} - Encrypted text
 */
const encrypt = (plain) => {
    return plain.split('').map(char => {
        const code = char.charCodeAt(0);
        
        // Numbers 0-9 → shift by +3
        if (code >= 48 && code <= 57) {
            return String.fromCharCode(((code - 48 + 3) % 10) + 48);
        }
        
        // Uppercase letters A-Z → shift by +3
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + 3) % 26) + 65);
        }
        
        // Lowercase letters a-z → shift by +3
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + 3) % 26) + 97);
        }
        
        // Return unchanged for other characters
        return char;
    }).join('');
};

/**
 * Decrypt string using Caesar cipher (-3 shift)
 * @param {string} encrypted - Encrypted text
 * @returns {string} - Decrypted text
 */
const decrypt = (encrypted) => {
    return encrypted.split('').map(char => {
        const code = char.charCodeAt(0);
        
        // Numbers 0-9 → shift by -3
        if (code >= 48 && code <= 57) {
            return String.fromCharCode(((code - 48 - 3 + 10) % 10) + 48);
        }
        
        // Uppercase letters A-Z → shift by -3
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 - 3 + 26) % 26) + 65);
        }
        
        // Lowercase letters a-z → shift by -3
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 - 3 + 26) % 26) + 97);
        }
        
        // Return unchanged for other characters
        return char;
    }).join('');
};