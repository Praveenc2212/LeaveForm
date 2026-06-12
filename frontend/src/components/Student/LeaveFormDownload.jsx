import React, { useRef, useState, useImperativeHandle, forwardRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/logo.png";
import HODSign from "../../assets/HODSign.png";
import TutorSign from "../../assets/TutorSign.png";
const LeaveFormDownload = forwardRef(({ 
  name = "Student Name", 
  rollNumber = "N/A", 
  department = "N/A", 
  reason = "N/A", 
  startDate, 
  endDate 
}, ref) => {
  const printRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const element = printRef.current;
    let originalDisplay;

    try {
      originalDisplay = element.style.display;
      element.style.display = "block";

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#FFFFFF",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png", 1.0);

      const pageWidth = pdf.internal.pageSize.getWidth() - 20;
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, pageWidth, pageHeight);

      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${name.replace(/\s+/g, '_')}_leave_form.pdf`;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
      if (originalDisplay !== undefined) {
        element.style.display = originalDisplay;
      }
    }
  };

  useImperativeHandle(ref, () => handleDownloadPDF);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return isNaN(date) ? dateString : date.toLocaleDateString('en-IN');
    } catch {
      return dateString;
    }
  };

  return (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
      <div 
        ref={printRef} 
        className="max-w-[210mm] w-full bg-white p-10 text-black mx-auto"
        style={{ fontFamily: "'Times New Roman', serif", boxSizing: 'border-box', lineHeight: 1.5 }}
      >
        <div className="text-center mb-8">
          <img src={logo} alt="logo" />
          <h3 className="text-xl font-semibold">Student Leave Application</h3>
        </div>

        <div className="mb-6">
          <p className="mb-2"><strong>Name:</strong> {name}</p>
          <p className="mb-2"><strong>Roll Number:</strong> {rollNumber}</p>
          <p className="mb-2"><strong>Department:</strong> {department}</p>
        </div>

        <div className="mb-6">
          <p className="mb-2"><strong>Reason for Leave:</strong></p>
          <div className="border border-gray-300 p-2 min-h-20 whitespace-pre-wrap">
            {reason}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
          </div>
          <div>
            <p><strong>End Date:</strong> {formatDate(endDate)}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="h-20 border-t-2 border-black mx-auto w-48">
              <img src={HODSign} alt="HOD Sign" />
            </div>
            <p className="mt-2">HOD Signature</p>
          </div>
          <div className="text-center">
            <div className="h-20 border-t-2 border-black mx-auto w-48">
              <img src={TutorSign} alt="Tutor Sign" />
            </div>
            <p className="mt-2">Tutor Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LeaveFormDownload;
