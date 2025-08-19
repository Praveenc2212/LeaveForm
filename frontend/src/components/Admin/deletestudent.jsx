import { useRef, useState } from "react";
import * as XLSX from "xlsx";

export default function DeleteStudent() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      setFileName(file.name);
      setFileSelected(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const formattedData = jsonData.map((item) => ({
          name: item["name"] || "",
          roll: item["roll.no"] || "",
          dept: item["dept"] || "",
          class: item["class"] || "",
          year: item["year"] || "",
        }));

        setRows(formattedData);
        setSelectedRows(new Set());
        setSelectAll(false);
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Please select a valid Excel file (.xls or .xlsx)");
      setFileSelected(false);
    }
  };

  const handleSelectRow = (index) => {
    const updatedSelected = new Set(selectedRows);
    if (updatedSelected.has(index)) {
      updatedSelected.delete(index);
    } else {
      updatedSelected.add(index);
    }
    setSelectedRows(updatedSelected);
    setSelectAll(updatedSelected.size === rows.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const allIndexes = new Set(rows.map((_, index) => index));
      setSelectedRows(allIndexes);
      setSelectAll(true);
    }
  };

  const handleDeleteSelected = () => {
    const updatedRows = rows.filter((_, index) => !selectedRows.has(index));
    setRows(updatedRows);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-start p-8">
      {/* Back Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 ml-2 flex items-center text-sm text-blue-600 hover:text-blue-800 transition"
        >
          <img
            src="/icons/back.svg"
            alt="Back"
            className="w-[40px] h-[40px] -mr-3"
          />
        </button>
      </div>
      {/* File input */}
      <div className="mb-6">
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          onClick={handleButtonClick}
          className="w-[250px] h-[60px] bg-orange-400 hover:bg-orange-600 text-white font-bold text-lg rounded-xl shadow-md transition duration-300"
        >
          Select EXCEL File
        </button>
      </div>

      {fileName && <p className="text-gray-700 mb-4">Selected file: {fileName}</p>}

      {/* Table shown only after file is selected */}
      {fileSelected && rows.length > 0 && (
        <>
          <div className="mb-4">
            <button
              onClick={handleSelectAll}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              {selectAll ? "Deselect All" : "Select All"}
            </button>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Selected
            </button>
          </div>

          <div className="w-full max-w-5xl overflow-x-auto shadow-md">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-200 text-gray-700 font-semibold">
                <tr>
                  <th className="border px-4 py-2">Select</th>
                  <th className="border px-4 py-2">S.No</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Roll No</th>
                  <th className="border px-4 py-2">Dept</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Year</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr className="text-center" key={index}>
                    <td className="border px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(index)}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{row.name}</td>
                    <td className="border px-4 py-2">{row.roll}</td>
                    <td className="border px-4 py-2">{row.dept}</td>
                    <td className="border px-4 py-2">{row.class}</td>
                    <td className="border px-4 py-2">{row.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}