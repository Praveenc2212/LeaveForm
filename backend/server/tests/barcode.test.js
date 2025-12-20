import {
    generateEncryptedBarcode,
    validateAndDecryptBarcode,
} from "../utils/barcode.util.js";

function testBarcode() {
    // var formjson =
    //     '{"_id":"693c0dcd2490e2e1cccfb84a","applicantId":{"_id":"6873cd700069d5c88a1e5d43","name":"Dhanush","rollno":"717823P112"},"classId":{"_id":"6873cb680069d5c88a1e5d35","tutorIds":[{"_id":"6872c378a3f07310ca1d7a22","name":"Dr. Kala Rajamani"}],"department":"CSE","year":"III","section":"A"},"startDate":"2025-12-12T00:00:00.000Z","endDate":"2025-12-13T00:00:00.000Z","reason":"Going to Home","status":"Approved","appliedAt":"2025-12-12T12:42:53.209Z","__v":0}';
    //     let form = JSON.parse(formjson);

    var form = {
        _id: "693c0dcd2490e2e1cccfb84a",
        applicantId: {
            _id: "6873cd700069d5c88a1e5d43",
            name: "Dhanush",
            rollno: "717823P112",
            studentType: "HOSTELLER",
        },
        classId: {
            _id: "6873cb680069d5c88a1e5d35",
            tutorIds: [
                {
                    _id: "6872c378a3f07310ca1d7a22",
                    name: "Dr. Kala Rajamani",
                },
            ],
            department: "CSE",
            year: "III",
            section: "A",
        },
        startDate: "2025-12-12T00:00:00.000Z",
        endDate: "2025-12-13T00:00:00.000Z",
        reason: "Going to Home",
        status: "Approved",
        appliedAt: "2025-12-12T12:42:53.209Z",
        __v: 0,
    };
    var barcodeString = generateEncryptedBarcode(
        form.applicantId.rollno,
        form.startDate,
        form.applicantId.studentType
    );
    console.log("Barcode String : ", barcodeString);

    var decodedData = validateAndDecryptBarcode("47455856S445414558K");

    console.log("Decoded Data From Barcode String : ", decodedData);
}

testBarcode();