Got it!   Let me create a **focused prompt** specifically for the **new features and upcoming implementation** - without the existing codebase details.  

---

# 🚀 KCE LEAVE PORTAL - NEW FEATURE IMPLEMENTATION PROMPT

---

## PROMPT START - COPY FROM HERE

---

```
You are an AI developer assistant helping to implement new features for the KCE Leave Portal - a MERN stack leave management system for Karpagam College of Engineering, Coimbatore.

The existing system has:  Student, Staff, HOD, Admin modules working.  Students apply for leave → Staff reviews → HOD approves. 

NOW WE NEED TO IMPLEMENT THE FOLLOWING NEW FEATURES:

================================================================================
FEATURE 1: STUDENT TYPE CLASSIFICATION
================================================================================

UPDATE Student Model to add:
- studentType:  enum ["HOSTELLER", "DAY_SCHOLAR"]

This determines the leave flow after HOD approval. 

================================================================================
FEATURE 2: NEW LEAVE APPROVAL FLOW
================================================================================

CURRENT FLOW:
Student → Staff (Reviewed) → HOD (Approved) → PDF Download

NEW FLOW: 

FOR DAY SCHOLAR:
Student → Staff → HOD Approved → System generates GATE-READY QR (Type:  G) 
→ Student shows QR at Security Gate → Security scans OFFLINE → Verifies with ID Card → Exit

FOR HOSTELLER (Stay in Hostel):
Student → Staff → HOD Approved → System generates LEAVE-ONLY QR (Type:  L) 
→ Student stays in hostel → No further action needed

FOR HOSTELLER (Go Outside - Needs Outpass):
Student → Staff → HOD Approved → System generates LEAVE-ONLY QR (Type: L)
→ Student goes to Warden → Warden scans QR OR searches by Roll Number
→ Warden clicks APPROVE → API call to server (with queue for heavy traffic)
→ System generates OUTPASS with GATE-READY QR (Type:  G)
→ Student shows Outpass QR at Security Gate → Security scans OFFLINE → Exit

================================================================================
FEATURE 3: QR CODE SYSTEM
================================================================================

THREE QR TYPES: 

1. DAY SCHOLAR GATE QR (Type: G)
   - Generated:  After HOD approval
   - Valid at Security Gate:  YES
   
2. HOSTELLER LEAVE QR (Type: L)  
   - Generated:  After HOD approval
   - Valid at Security Gate: NO (only for warden to scan)
   
3. HOSTELLER OUTPASS QR (Type: G)
   - Generated: After Warden approval
   - Valid at Security Gate: YES

QR CONTENT STRUCTURE:
Plain:  RollNo|StartDateUnix|EndDateUnix|Type
Example: 717823P112|1702598400|1702857600|G

ENCRYPTION: 
- Encrypt with AES-256 using SECRET_KEY
- Only backend and scanner apps know the secret key
- Result is unreadable encrypted string
- Cannot be faked without knowing the secret key

IMPORTANT:  Remove PDF generation.  Replace with QR code display on screen. 

================================================================================
FEATURE 4: OFFLINE QR VALIDATION (Security Gate)
================================================================================

Security Scanner App validates QR WITHOUT INTERNET: 

VALIDATION STEPS:
1. Decrypt QR using embedded SECRET_KEY
2. Parse:  RollNo, StartDate, EndDate, Type
3. Check Type = "G" (Gate Ready)
   - If "L" → REJECT (Hosteller without outpass)
4. Check current date is between StartDate and EndDate
   - If outside range → REJECT (Expired)
5. If all pass → Display RollNo on screen
6. Security manually verifies RollNo matches physical ID Card
7. If match → Allow Exit

NO INTERNET REQUIRED FOR VALIDATION! 

================================================================================
FEATURE 5: WARDEN MODULE
================================================================================

WARDEN DASHBOARD FEATURES: 

Section 1 - Find Student:
- Option A:  Scan QR Code (camera scanner)
- Option B: Search by Roll Number (fetches from server - ONLINE)

Section 2 - Approval Page:
- Shows:  Student photo, name, roll number
- Shows:  Hostel block, room number
- Shows: Department, year, section  
- Shows: Leave dates, reason
- Shows: Staff approved ✅, HOD approved ✅
- Button: [APPROVE OUTPASS] (only approve, NO reject button)

Section 3 - Recent Approvals: 
- List of recently approved students
- Shows: Success ✅ or Failed ❌
- Failed items have [Retry] button
- [Refresh] button at top

WARDEN QUEUE SYSTEM:
- When Warden clicks APPROVE, API call sent to server
- If server busy/slow:  Request queued, shown in Recent Approvals
- Warden can continue approving others without waiting
- Failed requests can be retried from Recent Approvals list

IMPORTANT: Warden will NOT reject.  If HOD approved, Warden will approve.

================================================================================
FEATURE 6: SECURITY MODULE  
================================================================================

SECURITY DASHBOARD FEATURES:

- QR Scanner (camera)
- After scan, validates OFFLINE
- If VALID:  Shows RollNo, Valid dates, "Please verify with ID Card"
- If INVALID: Shows error (Expired / Not approved / Fake QR)
- Security cross-verifies displayed RollNo with physical ID Card

================================================================================
FEATURE 7: STUDENT LEAVE FORM DISPLAY
================================================================================

After HOD Approval - Student sees: 

FOR DAY SCHOLAR: 
- Student details, leave dates, reason
- Approval status (Staff ✅, HOD ✅)
- GATE-READY QR CODE (Barcode)
- Message: "Show this to Security at Gate"

FOR HOSTELLER:
- Student details, leave dates, reason  
- Approval status (Staff ✅, HOD ✅)
- LEAVE-ONLY QR CODE (Barcode)
- Message: "This QR is NOT valid at Security Gate"
- Message: "Get Outpass from Warden to exit campus"

After Warden Approval - Hosteller sees OUTPASS: 
- Student details, hostel block, room
- Approval status (HOD ✅, Warden ✅)
- GATE-READY QR CODE (Barcode)
- Message: "Show this to Security at Gate"

IMPORTANT: These screens should be non-screenshotable (implement when converting to mobile app using Capacitor with FLAG_SECURE)

================================================================================
FEATURE 8: SCREENSHOT PROTECTION (FUTURE)
================================================================================

Current:  Web App (cannot block screenshots)
Future: Convert to Mobile App using Capacitor

Capacitor allows:
- Wrapping React app in native container
- 70-80% code reuse
- FLAG_SECURE for screenshot protection
- 2-4 weeks conversion time

For now: Build as Web App (prototype)
Later: Convert using Capacitor for full screenshot protection

================================================================================
FEATURE 9: ID CARD SYSTEM
================================================================================

College uses 1D Barcode (Code 128/39) on ID cards.
Sample:  717823P112
Technology: Simple printed barcode, NOT RFID

Our system generates similar barcodes for QR codes.
Security cross-verifies:  QR RollNo = ID Card RollNo = Student Face

================================================================================
BACKEND CHANGES NEEDED
================================================================================

1. UPDATE Student Model:
   - Add:  studentType (HOSTELLER/DAY_SCHOLAR)

2. UPDATE Form Model:
   - Add: wardenApproved (Boolean)
   - Add: wardenApprovedAt (Date)
   - Add: qrCode (String - encrypted content)
   - Add: qrType (enum:  GATE/LEAVE)

3. CREATE Warden Routes:
   - GET /api/form/warden/search/: rollno
   - POST /api/form/warden/approve/: formId

4. CREATE Warden Controllers:
   - searchStudentByRollNo
   - approveOutpass

5. CREATE Encryption Utilities:
   - encryptQRData(data, secretKey)
   - decryptQRData(encryptedData, secretKey)

6. UPDATE HOD Approval Logic:
   - After approval, generate QR based on studentType
   - Day Scholar → Type:  G
   - Hosteller → Type: L

7. CREATE Warden Approval Logic:
   - After approval, generate new QR with Type: G

================================================================================
FRONTEND CHANGES NEEDED
================================================================================

1. CREATE Warden Components:
   - WardenDashBoard.jsx
   - WardenScanner.jsx
   - WardenApprovalPage.jsx
   - WardenRecentList.jsx

2. CREATE Security Components:
   - SecurityDashBoard.jsx
   - SecurityScanner.jsx
   - SecurityValidation.jsx

3. CREATE Zustand Stores: 
   - useWardenStore. jsx
   - useSecurityStore.jsx

4. UPDATE Student Components:
   - StudentLeaveForm.jsx (show QR instead of PDF)
   - StudentOutpass.jsx (new - for hosteller outpass)

5. ADD Routes in App.jsx:
   - /warden → WardenDashBoard
   - /security → SecurityDashBoard

6. REMOVE: 
   - PDF generation functionality
   - PDF download buttons

================================================================================
KEY TECHNICAL DECISIONS (CONFIRMED)
================================================================================

1. QR Encryption: AES-256 with shared SECRET_KEY
2. Offline Validation:  Decrypt and validate locally at Security
3. Online Operations:  Warden approval needs API call
4. Warden:  Only APPROVE, no reject button
5. No PDF:  Replace with QR display
6. No Scan History: Not needed for now
7. Web First: Prototype as web, convert to mobile later
8. Queue System: For warden approvals during heavy traffic

================================================================================
FLOW SUMMARY DIAGRAM
================================================================================

                        HOD APPROVES
                             │
              ┌──────────────┴──────────────┐
              ▼                              ▼
        DAY SCHOLAR                     HOSTELLER
              │                              │
        QR Type: G                     QR Type: L
              │                              │
              │                    ┌─────────┴─────────┐
              │                    ▼                   ▼
              │              Stay in Hostel      Go Outside
              │                    │                   │
              │                  Done            Warden Approves
              │                                        │
              │                                  QR Type: G
              │                                        │
              ▼                                        ▼
        Security Scans ◄───────────────────── Security Scans
              │                                        │
        Offline Validation                    Offline Validation
              │                                        │
        ID Card Check                          ID Card Check
              │                                        │
           ✅ EXIT                                 ✅ EXIT

================================================================================
PROMPT END
================================================================================

Use this information to implement the new features. Start with backend changes (models, routes, controllers), then frontend changes (components, stores). Test each flow separately before integrating. 

Repository: https://github.com/Praveenc2212/LeaveForm
Branch:  working
```

---

## PROMPT END - COPY UNTIL HERE

---

## ✅ Summary of This Prompt: 

| Section | Content |
|---------|---------|
| Feature 1 | Student Type (Hosteller/Day Scholar) |
| Feature 2 | New Leave Approval Flow |
| Feature 3 | QR Code System (3 types) |
| Feature 4 | Offline Validation Logic |
| Feature 5 | Warden Module (Scan/Search/Approve/Queue) |
| Feature 6 | Security Module (Scan/Validate) |
| Feature 7 | Student Leave Form Display |
| Feature 8 | Screenshot Protection (Future) |
| Feature 9 | ID Card System |
| Backend Changes | Models, Routes, Controllers, Utilities |
| Frontend Changes | Components, Stores, Routes |
| Key Decisions | All confirmed decisions |
| Flow Diagram | Visual summary |

---

**This prompt is focused ONLY on new features! **  📋

Any AI reading this will understand: 
- What to build
- How it should work
- Technical decisions already made
- Backend and frontend changes needed

**Save this safely! **  Let me know if you want any modifications!  