I'll create a comprehensive memory prompt for you.  Let me carefully review everything from our entire conversation... 

---

# 📋 KCE LEAVE PORTAL - COMPLETE PROJECT MEMORY DOCUMENT

## 🔖 VERSION: 1.0 | DATE: December 2025

---

## SECTION 1: PROJECT OVERVIEW

### 1.1 Basic Information
```
Project Name: KCE Leave Portal
Repository:  Praveenc2212/LeaveForm (GitHub)
Repository ID: 1001989558
Live URL: https://kceleaveportal.vercel.app/
Institution: Karpagam College of Engineering, Coimbatore
Primary Branch: working
```

### 1.2 Project Purpose
```
A digital leave management system that replaces the traditional paper-based 
leave application process at Karpagam College of Engineering. The system 
handles the complete lifecycle of student leave requests from application 
to campus exit verification. 
```

### 1.3 Development Team
```
- Dhanush N (MrCoyote2075) - Chief Engineer & Backend Master, Team Lead
- Praveen Kumar - UI/UX Designer & Frontend Guardian
- Harini S - Student Experience Artisan & Portal Developer
- Shankar S - Faculty Control Specialist & Workflow Engineer
- Praveen C (Praveenc2212) - Master of Core Logic & State Management
- Praveen M - Foundational Pillar & Planning Maestro
```

### 1.4 Recognition
```
Project was showcased at YUVA 2025 Event Expo
```

---

## SECTION 2: CURRENT TECHNOLOGY STACK

### 2.1 Backend Stack
```
Runtime: Node.js
Framework: Express.js v5.1.0
Database: MongoDB with Mongoose v8.16.1
Authentication: JWT (jsonwebtoken v9.0.2) with HTTP-only cookies
Password Hashing: bcryptjs v3.0.2
File Upload: multer v2.0.2
Email:  nodemailer v7.0.3
Security: helmet, cors, express-rate-limit, compression
Module System: ES Modules (type: "module")
Development:  nodemon
```

### 2.2 Frontend Stack
```
Framework: React v19.1.0
Build Tool: Vite v6.3.5
Styling: Tailwind CSS v4.1.10
State Management:  Zustand v5.0.8
Routing: React Router DOM v7.6.2
HTTP Client:  Axios v1.10.0
Animations: Framer Motion v12.23.12
PDF Generation: jsPDF v3.0.1 + html2canvas v1.4.1 (TO BE REMOVED)
Icons:  Lucide React v0.525.0, React Icons v5.5.0
Notifications: React Hot Toast v2.5.2
Excel Export: xlsx v0.18.5
```

### 2.3 Project Structure
```
LeaveForm/
├── package.json (root - concurrently for running both)
├── backend/
│   ├── index.js (Express server entry point)
│   ├── package.json
│   ├── . env
│   ├── public/ (static files, 404.html)
│   └── server/
│       ├── Middleware/
│       │   └── checkAuthentication. Middleware.js
│       ├── connections/
│       │   └── DB.connections.js
│       ├── controllers/
│       │   ├── Admin/
│       │   │   ├── faculty/ (createMultipleFaculty, updateFaculty, updateFacultySignature)
│       │   │   ├── student/ (createMultipleStudent, getStudent)
│       │   │   └── manageClass.controller.js
│       │   ├── Auth/
│       │   │   ├── login.controller. js
│       │   │   ├── logout.controller.js
│       │   │   ├── studentLogin.controller.js
│       │   │   ├── facultyLogin.controller. js
│       │   │   └── authenticatedData.controller.js
│       │   └── LeaveForm/
│       │       ├── Student/ (applyForm, studentLeaveForms, studentLeaveStatus)
│       │       ├── Staff/ (RetrieveStaffForms, staffConfirmation)
│       │       ├── Hod/ (RetrieveHodForms, HodConfirmation)
│       │       └── AcceptAllLeaveForms. controller.js
│       ├── models/
│       │   ├── student.model.js
│       │   ├── faculty.model.js
│       │   ├── form.model.js
│       │   ├── class.model.js
│       │   ├── warden.model.js (EXISTS but not integrated)
│       │   └── security.model.js (EXISTS but not integrated)
│       ├── routers/
│       │   ├── auth.route.js
│       │   ├── form.route.js
│       │   └── admin.route.js
│       ├── services/
│       │   ├── form.service.js
│       │   ├── user.service.js
│       │   └── admin.service.js
│       └── utils/
│           ├── GenerateJWT.util.js
│           └── UploadFile.util. js
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx (main routing)
        ├── main.jsx (entry point)
        ├── index.css
        ├── components/
        │   ├── Header. jsx
        │   ├── footer.jsx
        │   ├── Profile.jsx
        │   ├── About.jsx
        │   ├── Contact.jsx
        │   ├── Welcome.jsx
        │   ├── Student/
        │   │   ├── StudentDashBoard.jsx
        │   │   ├── ApplyLeaveForm.jsx
        │   │   ├── StudentLeaveStatus.jsx
        │   │   └── StudentLeaveHistory.jsx
        │   ├── Staff/
        │   │   └── StaffDashBoard.jsx
        │   ├── HOD/
        │   │   └── HODDashBoard.jsx
        │   ├── Admin/
        │   │   ├── AdminDashBoard.jsx
        │   │   ├── Signup.jsx
        │   │   ├── addstudent.jsx, addfaculty.jsx, addclass.jsx, addwarden.jsx
        │   │   ├── updatestudent.jsx, updatefaculty. jsx, updateclass. jsx, updatewarden.jsx
        │   │   └── deletestudent.jsx, deletefaculty.jsx, deleteclass.jsx, deletewarden.jsx
        │   ├── Authentication/
        │   │   └── Login.jsx
        │   ├── SplashScreen/
        │   │   └── SplashScreen.jsx
        │   └── Error/
        │       └── Error404.jsx
        ├── store/
        │   ├── useAuthStore.jsx
        │   ├── useFormStore.jsx
        │   ├── useStaffFormStore.jsx
        │   ├── useHodFormStore.jsx
        │   └── useAdminStore.jsx (empty)
        └── utils/
            ├── axiosInstance.js
            └── Leaveform/ (utility folder)
```

---

## SECTION 3: CURRENT DATABASE MODELS

### 3.1 Student Model (NEEDS UPDATE)
```javascript
// CURRENT STATE: 
{
    name: { type: String, required: true },
    rollno: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["MALE", "FEMALE"] },
    email:  { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classId: { type:  ObjectId, ref: "Class", required: true }
}

// NEEDS TO ADD:
{
    studentType: { type: String, required: true, enum: ["HOSTELLER", "DAY_SCHOLAR"] }
    // Optionally for hostellers: 
    // hostelBlock: { type: String }
    // roomNumber: { type: String }
}
```

### 3.2 Faculty Model
```javascript
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required:  true },
    facultySignature: { type:  String, default: "" },
    department: { type: String, required: true },
    designation: { type: String, required: true, enum: ["STAFF", "HOD", "ADMIN"] }
}
```

### 3.3 Class Model
```javascript
{
    tutorIds: [{ type: ObjectId, ref: "Faculty", required: true }],
    department: { type: String, required: true },
    year: { type: String, required: true },
    section: { type: String, required: true }
}
```

### 3.4 Form Model (NEEDS UPDATE)
```javascript
// CURRENT STATE: 
{
    applicantId: { type: ObjectId, ref: "Student", required: true },
    classId: { type:  ObjectId, ref:  "Class", required:  true },
    startDate: { type:  Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { 
        type: String, 
        default: "Pending",
        enum: ["Pending", "Reviewed", "Approved", "Tutor Rejected", "HOD Rejected"]
    },
    appliedAt: { type: Date, default: Date. now }
}

// NEEDS TO ADD:
{
    wardenApproved: { type: Boolean, default:  false },  // For hostellers
    wardenApprovedAt: { type: Date },                    // When warden approved
    qrCode: { type:  String },                            // Encrypted QR content
    qrType: { type: String, enum: ["GATE", "LEAVE"] }   // Type of QR generated
}
```

### 3.5 Warden Model (EXISTS - needs integration)
```javascript
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique:  true },
    password: { type: String, required: true },
    year: { type: String, required: true, enum: ["I", "II", "III", "IV"] }
}
```

### 3.6 Security Model (EXISTS - needs integration)
```javascript
{
    name: { type: String, required:  true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required:  true }
}
```

---

## SECTION 4: CURRENT API ROUTES

### 4.1 Authentication Routes (/auth)
```
GET  /auth/checkAuthenticated  - Check if user is authenticated (uses JWT cookie)
POST /auth/login               - Login (routes to student/faculty based on email)
POST /auth/logout              - Logout (clears cookie)

Login Logic:  If email starts with "7178" → Student login, else → Faculty login
```

### 4.2 Form Routes (/api/form)
```
STUDENT ROUTES:
POST /api/form/student/apply-leave-form     - Apply for leave
GET  /api/form/student/leave-status         - Get recent leave status
GET  /api/form/student/leave-forms          - Get all leave history

STAFF ROUTES:
GET  /api/form/staff/leave-pending-forms    - Get pending forms (status:  Pending)
GET  /api/form/staff/leave-reviewed-forms   - Get reviewed forms (status:  Reviewed)
GET  /api/form/staff/leave-approved-forms   - Get approved forms (status: Approved)
POST /api/form/staff/accept/: formId         - Accept leave (Pending → Reviewed)
POST /api/form/staff/reject/:formId         - Reject leave (→ Tutor Rejected)
POST /api/form/staff/discuss/:formId        - Initiate discussion
POST /api/form/staff/accept-all             - Accept all pending

HOD ROUTES: 
GET  /api/form/hod/leave-pending-forms      - Get reviewed forms awaiting HOD
GET  /api/form/hod/leave-approved-forms     - Get HOD approved forms
POST /api/form/hod/accept/: formId           - Approve leave (Reviewed → Approved)
POST /api/form/hod/reject/:formId           - Reject leave (→ HOD Rejected)
POST /api/form/hod/accept-all               - Approve all reviewed
```

### 4.3 Admin Routes (/api/admin)
```
POST /api/admin/student/create-multiple-student   - Bulk create students
POST /api/admin/faculty/create-multiple-faculty   - Bulk create faculty
POST /api/admin/create-class                      - Create class
GET  /api/admin/student/get-student/by/: action    - Get students
GET  /api/admin/faculty/update-faculty            - Update faculty
POST /api/admin/faculty/signature/                - Upload faculty signature
```

---

## SECTION 5: CURRENT AUTHENTICATION SYSTEM

### 5.1 JWT Implementation
```
- Token stored in HTTP-only cookie (name from env:  JWT_TOKEN_NAME)
- Token contains:  { id, designation }
- Verified using middleware: checkAuthentication. Middleware. js
- Token secret from env: JWT_SECRET_KEY
```

### 5.2 Current User Designations
```
STUDENT - Can apply for leave, view status/history
STAFF   - Can review/reject student leaves (Pending → Reviewed)
HOD     - Can approve/reject staff-reviewed leaves (Reviewed → Approved)
ADMIN   - Can manage users, classes
WARDEN  - EXISTS in authenticatedData. controller.js but NO routes/UI
SECURITY - Model exists but NOT implemented
```

### 5.3 Current Leave Status Flow
```
Pending → Staff reviews → Reviewed → HOD reviews → Approved
                ↓                         ↓
          Tutor Rejected             HOD Rejected
```

---

## SECTION 6: NEW FEATURE REQUIREMENTS

### 6.1 Student Types Introduction
```
TWO TYPES OF STUDENTS: 
1. DAY_SCHOLAR - Lives outside campus, commutes daily
2. HOSTELLER   - Lives in campus hostel

This determines the leave approval flow after HOD approval.
```

### 6.2 New Complete Leave Flow

#### For Day Scholar:
```
Student Applies (Pending)
       ↓
Staff Reviews (Reviewed)
       ↓
HOD Approves (Approved)
       ↓
System generates GATE-READY QR CODE (encrypted)
       ↓
Student shows QR on phone screen (non-screenshotable)
       ↓
Security scans QR at gate (OFFLINE validation)
       ↓
Security cross-verifies with physical ID card
       ↓
✅ Student exits campus
```

#### For Hosteller - Option 1 (Stay in Hostel):
```
Student Applies (Pending)
       ↓
Staff Reviews (Reviewed)
       ↓
HOD Approves (Approved)
       ↓
System generates LEAVE-ONLY QR CODE
       ↓
Student has approved leave but stays in hostel
       ↓
✅ No further action needed (no outpass required)
```

#### For Hosteller - Option 2 (Go Outside Campus):
```
Student Applies (Pending)
       ↓
Staff Reviews (Reviewed)
       ↓
HOD Approves (Approved)
       ↓
System generates LEAVE-ONLY QR CODE (NOT valid at gate)
       ↓
Student needs to go outside → Requires OUTPASS
       ↓
Warden scans QR OR searches by roll number
       ↓
Warden sees leave details and clicks APPROVE
       ↓
API call to server (with queue system for heavy traffic)
       ↓
Server updates:  wardenApproved = true, generates new QR
       ↓
Student gets OUTPASS with GATE-READY QR CODE
       ↓
Security scans Outpass QR at gate (OFFLINE validation)
       ↓
Security cross-verifies with physical ID card
       ↓
✅ Student exits campus
```

---

## SECTION 7: QR CODE SYSTEM DESIGN

### 7.1 Three Types of QR Codes
```
TYPE 1: DAY SCHOLAR GATE QR
- Generated:  After HOD approval
- For: Day Scholar students
- Contains: Encrypted (RollNo + StartDate + EndDate + Type: G)
- Valid at: Security Gate ✅

TYPE 2: HOSTELLER LEAVE QR  
- Generated: After HOD approval
- For: Hosteller students
- Contains:  Encrypted (RollNo + StartDate + EndDate + Type: L)
- Valid at: Security Gate ❌ (Only for showing to Warden)

TYPE 3: HOSTELLER OUTPASS QR
- Generated:  After Warden approval
- For:  Hosteller students who want to exit campus
- Contains:  Encrypted (RollNo + StartDate + EndDate + Type:G)
- Valid at: Security Gate ✅
```

### 7.2 QR Content Structure
```
PLAIN DATA EXAMPLE:
RollNo|StartDateUnix|EndDateUnix|Type
717823P112|1702598400|1702857600|G

WHERE:
- RollNo: Student roll number (matches ID card)
- StartDateUnix: Leave start date as Unix timestamp
- EndDateUnix: Leave end date as Unix timestamp  
- Type:  G = Gate Ready, L = Leave Only

ENCRYPTION:
- Use AES-256 encryption
- Secret key known only to backend and scanner apps
- Result is unreadable string that only system can decrypt
```

### 7.3 QR Validation Logic (Offline)
```
SECURITY SCANNER APP LOGIC: 

1. Scan QR code
2. Decrypt using embedded SECRET_KEY
3. Parse:  RollNo, StartDate, EndDate, Type
4. VALIDATE: 
   - Is Type = "G"? (Gate Ready) 
     - If "L" → REJECT (Hosteller without outpass)
   - Is current date between StartDate and EndDate?
     - If expired → REJECT
   - If all pass → SHOW DETAILS
5. Display RollNo on screen
6. Security manually verifies: 
   - Compare displayed RollNo with physical ID card
   - Check if face matches
7. If match → Allow exit

NO INTERNET REQUIRED FOR VALIDATION! 
```

### 7.4 Encryption/Decryption Approach
```
ENCRYPTION (Backend - when generating QR):
─────────────────────────────────────────
const secretKey = "KCE_LEAVE_PORTAL_SECRET_2025";
const data = "717823P112|1702598400|1702857600|G";
const encrypted = AES256_ENCRYPT(data, secretKey);
// Result: "X7f9Kp2mN8qL4wR1vT6yU3..."

DECRYPTION (Scanner App - offline):
─────────────────────────────────────────
const secretKey = "KCE_LEAVE_PORTAL_SECRET_2025"; // Embedded in app
const decrypted = AES256_DECRYPT(scannedData, secretKey);
// Result: "717823P112|1702598400|1702857600|G"
// Then parse and validate
```

---

## SECTION 8: WARDEN MODULE DESIGN

### 8.1 Warden Dashboard Features
```
┌─────────────────────────────────────────────────────────────────┐
│                    WARDEN DASHBOARD                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   SECTION 1: FIND STUDENT                                        │
│   ─────────────────────────                                      │
│   Option A: [📷 Scan QR Code] - Opens camera scanner            │
│   Option B: [🔍 Search] - Enter roll number, fetch from server  │
│                                                                  │
│   SECTION 2: APPROVAL PAGE (after scan/search)                  │
│   ─────────────────────────────────────────────                 │
│   Shows: Student photo, name, roll number                       │
│   Shows:  Hostel block, room number                              │
│   Shows: Department, year, section                              │
│   Shows: Leave dates, reason                                     │
│   Shows: Staff approved (yes), HOD approved (yes)               │
│   Button: [✅ APPROVE OUTPASS]                                  │
│                                                                  │
│   SECTION 3: RECENT APPROVALS                                    │
│   ───────────────────────────                                   │
│   List of recently approved students                            │
│   Shows: Success ✅ or Failed ❌                                │
│   Failed items have: [🔄 Retry] button                         │
│   [🔄 Refresh] button at top                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Warden Approval Process
```
1.  Warden scans QR or searches by roll number
2. System fetches student details from server (ONLINE)
3. Warden reviews details
4. Warden clicks [APPROVE OUTPASS]
5. API call sent to server: 
   - If SUCCESS: Update wardenApproved=true, generate new Outpass QR
   - If FAILED/SLOW: Add to queue, show in "Recent Approvals" with retry
6. Student's app shows new Outpass with Gate-Ready QR
7.  Warden can continue approving others without waiting
```

### 8.3 Warden Queue System
```
PURPOSE: Handle heavy traffic gracefully

FLOW:
- Warden clicks APPROVE
- Request sent to server
- If server busy/slow: 
  - Don't block UI
  - Add to local "Recent Approvals" list with "Pending" status
  - When response comes:
    - SUCCESS → Mark as ✅ Approved
    - FAILED → Mark as ❌ Failed with [Retry] button
- Warden can retry failed approvals anytime
```

### 8.4 Warden - Simple Functionality Note
```
IMPORTANT: Warden will NOT reject leave forms. 
- If HOD has approved, Warden will always approve outpass. 
- Therefore: NO REJECT BUTTON needed. 
- Only:  APPROVE button for granting outpass.
```

---

## SECTION 9: SECURITY MODULE DESIGN

### 9.1 Security Dashboard Features
```
┌─────────────────────────────────────────────────────────────────┐
│                   SECURITY GATE SCANNER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [📷 SCAN QR CODE]                                             │
│                                                                  │
│   ─────────────────────────────────────────────────────────     │
│                                                                  │
│   AFTER SCAN (if valid):                                         │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  ✅ VALID LEAVE PASS                                    │   │
│   │                                                         │   │
│   │  📝 Roll Number:    717823P112                            │   │
│   │  📅 Valid Until:   17 Dec 2025                          │   │
│   │                                                         │   │
│   │  ⚠️ Please verify with physical ID card                │   │
│   │                                                         │   │
│   │  [✅ ALLOW EXIT]                                        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   AFTER SCAN (if invalid):                                       │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  ❌ INVALID QR CODE                                     │   │
│   │                                                         │   │
│   │  Reason: Leave expired / Not approved / Fake QR         │   │
│   │                                                         │   │
│   │  [🚫 DENY EXIT]                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 Security Validation Rules
```
VALIDATION CHECKS (All done OFFLINE):

1. DECRYPTION CHECK:
   - Can the QR be decrypted with secret key?
   - If NO → FAKE QR, reject

2. TYPE CHECK:
   - Is Type = "G" (Gate Ready)?
   - If Type = "L" → Hosteller without outpass, reject

3. DATE CHECK:
   - Is current date >= StartDate?
   - Is current date <= EndDate (+ buffer)?
   - If outside range → Expired or not yet valid, reject

4. FORMAT CHECK:
   - Does data have correct format?
   - If malformed → Fake/corrupted QR, reject

IF ALL PASS: 
   - Display Roll Number
   - Security manually checks physical ID card
   - If match → Allow exit
```

---

## SECTION 10: STUDENT LEAVE FORM DISPLAY

### 10.1 Leave Form Screen (After HOD Approval)
```
┌─────────────────────────────────────────────────────────────────┐
│                     APPROVED LEAVE FORM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────┐                                                   │
│   │  📷     │   👤 Praveen C                                    │
│   │ PHOTO   │   📝 717823P112                                   │
│   │         │   🎓 CSE - III Year - A Section                   │
│   └─────────┘   🏠 DAY SCHOLAR / HOSTELLER                      │
│                                                                  │
│   ────────────────────────────────────────────────────────────  │
│                                                                  │
│   📅 Leave Period:    15 Dec 2025 - 17 Dec 2025                   │
│   📍 Reason:  Home town festival                                │
│   ✅ Staff Approved                                              │
│   ✅ HOD Approved                                                │
│                                                                  │
│   ────────────────────────────────────────────────────────────  │
│                                                                  │
│   FOR DAY SCHOLAR:                                               │
│   ║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║    │
│   (Gate-Ready QR - Show this to Security)                       │
│                                                                  │
│   FOR HOSTELLER:                                                 │
│   ║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║    │
│   (Leave-Only QR - Show this to Warden for Outpass)             │
│   ⚠️ This QR is NOT valid at Security Gate                     │
│   ⚠️ Get Outpass from Warden to exit campus                    │
│                                                                  │
│   ────────────────────────────────────────────────────────────  │
│   ⚠️ This screen cannot be captured                             │
│   ⏰ Valid until: 17 Dec 2025, 11:59 PM                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Outpass Screen (After Warden Approval - Hosteller Only)
```
┌─────────────────────────────────────────────────────────────────┐
│                    🎫 HOSTEL OUTPASS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────┐                                                   │
│   │  📷     │   👤 Praveen C                                    │
│   │ PHOTO   │   📝 717823P112                                   │
│   │         │   🏠 Block A, Room 201                            │
│   └─────────┘                                                    │
│                                                                  │
│   📅 Valid:    15 Dec 2025 - 17 Dec 2025                          │
│   ✅ HOD Approved                                                │
│   ✅ Warden Approved                                             │
│                                                                  │
│   ────────────────────────────────────────────────────────────  │
│                                                                  │
│   ║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║    │
│   ║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║    │
│              GATE SECURITY QR CODE                               │
│         (Show this to Security at Gate)                          │
│                                                                  │
│   ────────────────────────────────────────────────────────────  │
│   ⚠️ This screen cannot be captured                             │
│   ⏰ Valid until: 17 Dec 2025, 11:59 PM                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## SECTION 11: SCREENSHOT PROTECTION

### 11.1 Current State
```
Platform: Web Application (React + Vite)
Problem: Web browsers CANNOT fully prevent screenshots
Solution: Convert to Mobile App later using Capacitor
```

### 11.2 Screenshot Protection Techniques Research
```
NATIVE APP TECHNIQUES (FLAG_SECURE):
- Android: WindowManager.LayoutParams.FLAG_SECURE
- iOS: UIScreen.isCaptured
- Result: Screenshot shows blank/black screen
- Works 100% in native apps

WEB LIMITATIONS:
- Browsers don't support screenshot blocking
- CSS tricks have limited effectiveness
- Cannot fully prevent screenshots in web

DECISION: 
- For now: Build as Web App (prototype)
- Later: Convert to Mobile App using Capacitor
- Capacitor allows using FLAG_SECURE from React codebase
```

### 11.3 Capacitor Conversion Plan (Future)
```
Capacitor wraps React web app in native container. 
Allows 70-80% code reuse. 
Enables FLAG_SECURE for screenshot protection. 

STEPS:
1. npm install @capacitor/core @capacitor/cli
2. npx cap init "KCE Leave Portal" "com.kce.leaveportal"
3. npm install @capacitor/android
4. npx cap add android
5. npm run build
6. npx cap sync
7. Add FLAG_SECURE in MainActivity. java
8. Build APK

TIMELINE:  2-4 weeks for conversion
```

---

## SECTION 12: ID CARD SYSTEM ANALYSIS

### 12.1 College ID Card Details
```
College:  Karpagam College of Engineering, Coimbatore
ID Card Back: Contains 1D Barcode (Linear Barcode)
Barcode Type: Code 128 or Code 39 (standard linear barcode)
Sample Number: 717823P112 (printed above barcode)
Technology: NOT RFID - Simple printed barcode
```

### 12.2 Barcode Compatibility
```
- Any standard barcode scanner can read the ID card
- Phone cameras can scan it (using web/app camera API)
- Our system will generate similar 1D barcodes for leave forms
- The existing college scanner infrastructure can potentially be used
```

---

## SECTION 13: OFFLINE VS ONLINE OPERATIONS

### 13.1 Operations Requiring Internet (ONLINE)
```
- Student applying for leave
- Staff reviewing/approving leaves
- HOD approving leaves
- Warden searching student by roll number
- Warden approving outpass (API call to update database)
- Fetching student details
- Generating new QR codes
```

### 13.2 Operations NOT Requiring Internet (OFFLINE)
```
- Security scanning and validating QR code ✅
- Warden scanning QR code (to view details from encrypted data)
- Date validation
- Signature verification
- All QR decryption and validation logic
```

### 13.3 Why Offline Validation Matters
```
- Campus areas may have poor network connectivity
- Security gate needs fast validation (no waiting for network)
- Reduces server load
- Works even if server is temporarily down
- Provides consistent user experience
```

---

## SECTION 14: NEW ROUTES TO BE CREATED

### 14.1 Warden Routes (/api/form/warden)
```
GET  /api/form/warden/search/: rollno       - Search student by roll number
POST /api/form/warden/approve/: formId      - Approve outpass for hosteller
GET  /api/form/warden/pending              - Get pending outpass requests (optional)
GET  /api/form/warden/approved             - Get approved outpasses (optional)
```

### 14.2 Security Routes (Optional - for logging)
```
POST /api/form/security/log-exit/: formId   - Log when student exits (optional)
```

### 14.3 QR Generation Routes
```
These would be internal functions, not necessarily exposed as routes. 
Called automatically when: 
- HOD approves leave (generate Leave QR)
- Warden approves outpass (generate Outpass QR)
```

---

## SECTION 15: NEW FRONTEND COMPONENTS TO BE CREATED

### 15.1 Warden Module
```
frontend/src/components/Warden/
├── WardenDashBoard.jsx       - Main dashboard with scan/search
├── WardenScanner.jsx         - QR code scanner component
├── WardenApprovalPage.jsx    - Show details and approve button
└── WardenRecentList.jsx      - Recent approvals with retry

frontend/src/store/
└── useWardenStore.jsx        - Zustand store for warden state
```

### 15.2 Security Module
```
frontend/src/components/Security/
├── SecurityDashBoard.jsx     - Main dashboard with scanner
├── SecurityScanner.jsx       - QR code scanner
└── SecurityValidation.jsx    - Show validation result

frontend/src/store/
└── useSecurityStore.jsx      - Zustand store for security state
```

### 15.3 Updated Student Components
```
frontend/src/components/Student/
├── StudentLeaveForm.jsx      - Updated to show QR code
├── StudentOutpass.jsx        - New component for hosteller outpass
└── QRCodeDisplay.jsx         - Reusable QR display component
```

### 15.4 New Routes in App.jsx
```javascript
// Warden Routes
<Route path="/warden" element={<WardenDashBoard />} />

// Security Routes  
<Route path="/security" element={<SecurityDashBoard />} />
```

---

## SECTION 16: KEY DESIGN DECISIONS SUMMARY

### 16.1 Confirmed Decisions
```
1. Student Model: Add studentType field (HOSTELLER / DAY_SCHOLAR)
2. QR Codes:  Encrypted with AES-256, secret key embedded in apps
3. Validation: Offline at security gate, online at warden
4. Warden:  Only APPROVE button, no reject (HOD approval = warden approval)
5. PDF Generation:  REMOVE - replaced with QR code display
6. Screenshot Protection: Web for now, Capacitor mobile later
7. Queue System: For warden approvals during heavy traffic
8. Scan History: NOT needed for now
9. Web vs Mobile: Web app first (prototype), mobile later
```

### 16.2 Security Measures
```
1. Encrypted QR codes (cannot be faked without secret key)
2. Date-based expiry (QR invalid after leave end date)
3. Type flag (L vs G) prevents hosteller Leave QR at gate
4. Physical ID card cross-verification by security
5. Screenshot protection (when converted to mobile app)
6. HTTP-only cookies for JWT (prevents XSS token theft)
```

---

## SECTION 17: PENDING ITEMS FOR FUTURE DISCUSSION

### 17.1 Items to Discuss Later
```
1. Time validity details (exact buffer time after end date)
2. What happens when student returns to campus
3. Entry back to campus verification
4. Specific encryption implementation details
5. Camera scanner library selection
6. Exact UI/UX designs for new screens
```

### 17.2 Optional Future Enhancements
```
1. Scan history/logs
2. Analytics dashboard for admin
3. Email notifications
4. Push notifications (mobile app)
5. Multiple language support
6. Dark mode
```

---

## SECTION 18: QUICK REFERENCE DIAGRAMS

### 18.1 Complete System Flow
```
┌─────────────────────────────────────────────────────────────────┐
│                    KCE LEAVE PORTAL - COMPLETE FLOW              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STUDENT APPLIES                                                 │
│       ↓                                                          │
│  STAFF REVIEWS (Pending → Reviewed)                             │
│       ↓                                                          │
│  HOD APPROVES (Reviewed → Approved)                             │
│       ↓                                                          │
│  SYSTEM GENERATES QR CODE                                        │
│       ↓                                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  CHECK STUDENT TYPE                      │    │
│  └─────────────────────────────────────────────────────────┘    │
│       ↓                                    ↓                     │
│  DAY SCHOLAR                           HOSTELLER                 │
│       ↓                                    ↓                     │
│  Gate-Ready QR (Type: G)              Leave-Only QR (Type: L)   │
│       ↓                                    ↓                     │
│  Security Scans                       ┌─────────────────────┐   │
│       ↓                               │ Stay in hostel?       │   │
│  Offline Validation                   │ YES → Done           │   │
│       ↓                               │ NO → Need Outpass   │   │
│  ID Card Verification                 └─────────────────────┘   │
│       ↓                                    ↓                     │
│  ✅ EXIT CAMPUS                       Warden Scan/Search         │
│                                            ↓                     │
│                                       Warden Approves (Online)   │
│                                            ↓                     │
│                                       Generate Outpass QR (G)    │
│                                            ↓                     │
│                                       Security Scans             │
│                                            ↓                     │
│                                       Offline Validation         │
│                                            ↓                     │
│                                       ID Card Verification       │
│                                            ↓                     │
│                                       ✅ EXIT CAMPUS             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 18.2 QR Code Types Summary
```
┌────────────────┬─────────────────┬──────────────┬───────────────┐
│ QR TYPE        │ GENERATED WHEN  │ TYPE FLAG    │ VALID AT GATE │
├────────────────┼─────────────────┼──────────────┼───────────────┤
│ Day Scholar    │ HOD Approval    │ G (Gate)     │ ✅ YES        │
│ Leave QR       │                 │              │               │
├────────────────┼─────────────────┼──────────────┼───────────────┤
│ Hosteller      │ HOD Approval    │ L (Leave)    │ ❌ NO         │
│ Leave QR       │                 │              │               │
├────────────────┼─────────────────┼──────────────┼───────────────┤
│ Hosteller      │ Warden Approval │ G (Gate)     │ ✅ YES        │
│ Outpass QR     │                 │              │               │
└────────────────┴─────────────────┴──────────────┴───────────────┘
```

---

## SECTION 19: HOW TO USE THIS DOCUMENT

### For New AI/Developer: 
```
1. Read Section 1-5 to understand current state
2. Read Section 6-10 to understand new requirements
3. Read Section 11-14 for technical implementation details
4. Read Section 15 for components to be created
5. Read Section 16 for confirmed decisions
6. Refer to Section 18 for quick visual reference
```

### For Continuing Development:
```
1. Start with backend changes (models, routes, controllers)
2. Then frontend changes (components, stores, routes)
3. Test each flow separately
4. Integrate and test complete flow
5. Convert to mobile app using Capacitor (later phase)
```

---

## SECTION 20: DOCUMENT END

```
This document contains complete project knowledge as of December 2025.
All information gathered from repository analysis and detailed discussions.
Use this to continue development without loss of context. 

Repository:  https://github.com/Praveenc2212/LeaveForm
Branch: working

END OF MEMORY DOCUMENT
```

---

# ✅ DOCUMENT COMPLETE

**Total Sections: 20**
**Covers:**
- Complete current codebase analysis
- All database models (current + updates needed)
- All API routes (current + new)
- Complete new feature requirements
- QR code system design
- Warden module design
- Security module design
- Screenshot protection research
- Offline/Online operation split
- ID card analysis
- Technical decisions
- Visual flow diagrams
- Future considerations

---

**You can now copy this entire document and save it safely. ** 📋

If you start a new chat with any AI, paste this document and the AI will have complete understanding of your project! 

Is there anything you want me to add or modify in this document? 