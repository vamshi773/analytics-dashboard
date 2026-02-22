import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportUsersCSV(rows: UserRow[], filename = "users.csv") {
  const headers = ["ID", "Name", "Email", "Status", "Created At"];
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.id,
        `"${(r.name || "").replaceAll('"', '""')}"`,
        `"${(r.email || "").replaceAll('"', '""')}"`,
        r.status,
        new Date(r.createdAt).toISOString(),
      ].join(",")
    ),
  ];
  const csv = lines.join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename);
}

export function exportUsersExcel(rows: UserRow[], filename = "users.xlsx") {
  const wsData = rows.map((r) => ({
    ID: r.id,
    Name: r.name,
    Email: r.email,
    Status: r.status,
    "Created At": new Date(r.createdAt).toLocaleString(),
  }));

  const ws = XLSX.utils.json_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Users");
  XLSX.writeFile(wb, filename);
}

export function exportUsersPDF(rows: UserRow[], filename = "users.pdf") {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Users Report", 14, 16);

  autoTable(doc, {
    startY: 22,
    head: [["ID", "Name", "Email", "Status", "Created"]],
    body: rows.map((r) => [
      r.id,
      r.name,
      r.email,
      r.status,
      new Date(r.createdAt).toLocaleDateString(),
    ]),
    styles: { fontSize: 10 },
  });

  doc.save(filename);
}
