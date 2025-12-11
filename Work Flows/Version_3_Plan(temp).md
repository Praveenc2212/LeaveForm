```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   STUDENT   │────>│    STAFF    │────>│     HOD     │
│   Applies   │     │   Reviews   │     │  Approves   │
│  (Pending)  │     │ (Reviewed)  │     │ (Approved)  │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │  STUDENT SEES   │
                                    │  LEAVE FORM +   │
                                    │  QR/BARCODE     │
                                    └─────────────────┘
                                              │
                          ┌───────────────────┴───────────────────┐
                          ▼                                       ▼
                 ┌─────────────────┐                     ┌─────────────────┐
                 │   DAY SCHOLAR   │                     │    HOSTELLER    │
                 └─────────────────┘                     └─────────────────┘
                          │                                       │
                          ▼                                       ▼
                 ┌─────────────────┐                     ┌─────────────────┐
                 │    SECURITY     │                     │     WARDEN      │
                 │   Scans Code    │                     │   Scans Code    │
                 │  (Verifies &    │                     │  (Gives Outpass)│
                 │   Lets Out)     │                     └─────────────────┘
                 └─────────────────┘                              │
                          │                                       ▼
                          ▼                              ┌─────────────────┐
                 ┌─────────────────┐                     │    SECURITY     │
                 │     EXIT        │                     │   Scans Code    │
                 │   CAMPUS        │                     │  (Final Exit)   │
                 └─────────────────┘                     └─────────────────┘
                                                                  │
                                                                  ▼
                                                         ┌─────────────────┐
                                                         │     EXIT        │
                                                         │     CAMPUS      │
                                                         └─────────────────┘
```
---

### 2️⃣ **After HOD Approval - Student Dashboard**
- **No more PDF generation**
-   Show a **secure leave form page** with:
  - Basic leave details (name, dates, reason, etc.)
  - **QR Code / Barcode** (unique, scannable)
  - **Non-screenshotable page** (protected view)

### 3️⃣ **Security Features for Leave Form Display**
| Feature | Purpose |
|---------|---------|
| QR/Barcode | Easy scanning by Warden & Security |
| Non-screenshotable | Prevent students from faking/cheating |
| No PDF download | Prevent sharing/manipulation |
| Secure validation | Verify authenticity when scanned |

### 4️⃣ **Day Scholar Flow (After HOD Approval)**
```
HOD Approved → Student shows QR → Security Scans → Verified → Exit Campus
```
- Security scans the code
- System validates if leave is **real & valid**
- If valid → Student exits

### 5️⃣ **Hosteller Flow (After HOD Approval)**
```
HOD Approved → Student shows QR → Warden Scans → Outpass Given → Security Scans → ✅ Exit Campus
```
- **Step 1:** Warden scans the code
- **Step 2:** Warden gives **Outpass** (approves exit)
- **Step 3:** Student goes to Security gate
- **Step 4:** Security scans → Verifies Warden approval → Student exits

---

## 📋 Updated Status Flow

| Status | Description |
|--------|-------------|
| `Pending` | Student applied, waiting for Staff |
| `Reviewed` | Staff approved, waiting for HOD |
| `Approved` | HOD approved (ready for scan) |
| `Warden Approved` | Warden gave outpass (Hosteller only) |
| `Exited` | Security verified, student left campus |
| `Tutor Rejected` | Staff rejected |
| `HOD Rejected` | HOD rejected |
| `Warden Rejected` | Warden rejected (Hosteller only) |

---

## 🛠️ What Needs to be Built:

### **Backend:**
| Task | Description |
|------|-------------|
| 1 | Update `Student Model` - add `studentType` field |
| 2 | Update `Form Model` - add new statuses for Warden |
| 3 | Create `Warden Controller` - scan, approve, reject |
| 4 | Create `Security Controller` - scan, verify, mark exit |
| 5 | Create `QR/Barcode generation` utility |
| 6 | Create `QR/Barcode validation` API |
| 7 | Add Warden & Security routes |

### **Frontend:**
| Task | Description |
|------|-------------|
| 1 | Update Student Dashboard - show secure leave page with QR |
| 2 | Create **non-screenshotable** leave display component |
| 3 | Create `Warden Dashboard` - scanner + approve/reject |
| 4 | Create `Security Dashboard` - scanner + verify |
| 5 | Create `useWardenStore` - Zustand store |
| 6 | Create `useSecurityStore` - Zustand store |
| 7 | Add Warden & Security routes in App.jsx |

---

## ❓ A Few Clarifications Before We Proceed:

### 1️⃣ **QR Code Content - What should it contain?**
- Form ID? 
- Student Roll Number + Form ID?
- Encrypted token with expiry? 

### 2️⃣ **Non-Screenshotable Page - Implementation Approach:**
- **Option A:** CSS-based protection (blur on screenshot attempt, watermarks)
- **Option B:** Dynamic content that changes frequently
- **Option C:** Server-validated tokens that expire quickly
- **Option D:** Combination of all above

### 3️⃣ **Warden Scanner - How will Warden scan? **
- Mobile camera on Warden's phone? 
- Dedicated scanner device?
- Web-based camera scanner in dashboard? 

### 4️⃣ **Security Scanner - Same question:**
- Mobile app? 
- Web dashboard with camera?
- Physical barcode scanner connected to system?

### 5️⃣ **What happens if Warden Rejects a Hosteller?**
- Leave becomes invalid?
- Goes back to student with rejection reason?
- Student can re-apply?

### 6️⃣ **Time Validity:**
- Should the QR code expire after leave end date?
- Should it be valid only for specific time window?

---

## ✅ My Understanding is Complete! 

I've captured the complete flow: 

| Student Type | Flow |
|--------------|------|
| **Day Scholar** | Apply → Staff → HOD → Show QR → Security Scan → Exit |
| **Hosteller** | Apply → Staff → HOD → Show QR → Warden Scan → Outpass → Security Scan → Exit |

**Key Security Features:**
- 🔐 No PDF generation
- 📱 QR/Barcode for easy scanning
- 🛡️ Non-screenshotable protected page
- ✅ Real-time validation when scanned

---

**Please answer my clarification questions above, and then we can start building!** 

Or if you have more details to add about the flow, please continue - I'm still listening!  👂