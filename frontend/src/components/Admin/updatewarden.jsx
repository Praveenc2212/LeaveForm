import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function UpdateWarden() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");

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
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const formattedData = jsonData.map((item) => ({
          name: item["name"] || "",
          roll: item["roll.no"] || "",
          dept: item["dept"] || "",
          class: item["class"] || "",
          year: item["year"] || "",
        }));

        setRows(formattedData);
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Please select a valid Excel file (.xls or .xlsx)");
      setFileSelected(false);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedRow({ ...filteredRows[index] });
  };

  const handleSaveClick = (index) => {
    const originalIndex = rows.findIndex(
      (row) => row.roll === filteredRows[index].roll
    );
    const updatedRows = [...rows];
    updatedRows[originalIndex] = editedRow;
    setRows(updatedRows);
    setEditingIndex(null);
    setEditedRow({});
  };

  const handleInputChange = (e, field) => {
    setEditedRow({ ...editedRow, [field]: e.target.value });
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.roll.toString().includes(searchTerm);
    const matchesYear = filterYear ? row.year.toString() === filterYear : true;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-white p-8 font-sans flex flex-col items-center">
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

      {/* File Upload */}
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
          className="w-[250px] h-[60px] bg-orange-400 hover:bg-orange-600 text-white font-bold text-lg rounded-xl shadow-md transition"
        >
          Select EXCEL files
        </button>
      </div>

      {fileName && (
        <p className="text-gray-600 mb-4">Selected file: {fileName}</p>
      )}

      {/* Search and Filter */}
      {fileSelected && rows.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4 justify-center">
          {/* Search */}
          <div className="flex items-center border rounded px-2 py-1">
            <input
              type="text"
              placeholder="Search by name or roll no"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none px-2"
            />
            <img src="/icons/search.svg" alt="search" className="w-4 h-4 ml-1" />
          </div>

          {/* Filter by Year */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="">Filter by Year</option>
            {[...new Set(rows.map((row) => row.year))].map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Table */}
      {fileSelected && rows.length > 0 && (
        <div className="w-full max-w-5xl overflow-x-auto shadow-md">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200 text-gray-700 font-semibold">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Roll No</th>
                <th className="border px-4 py-2">Dept</th>
                <th className="border px-4 py-2">Class</th>
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr className="text-center" key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  {editingIndex === index ? (
                    <>
                      {["name", "roll", "dept", "class", "year"].map((field) => (
                        <td className="border px-2 py-1" key={field}>
                          <input
                            type="text"
                            value={editedRow[field]}
                            onChange={(e) => handleInputChange(e, field)}
                            className="border p-1 w-full"
                          />
                        </td>
                      ))}
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-2">{row.name}</td>
                      <td className="border px-4 py-2">{row.roll}</td>
                      <td className="border px-4 py-2">{row.dept}</td>
                      <td className="border px-4 py-2">{row.class}</td>
                      <td className="border px-4 py-2">{row.year}</td>
                    </>
                  )}
                  <td className="border px-4 py-2">
                    {editingIndex === index ? (
                      <button
                        onClick={() => handleSaveClick(index)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UpdateWarden;
