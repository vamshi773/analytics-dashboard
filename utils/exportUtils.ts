import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type OrderRow = {
  id: string;
  customer: string;
  status: string;
  amount: number;
  date: string;
};

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCSV(rows: OrderRow[], filename = "orders.csv") {
  const headers = ["Order ID", "Customer", "Status", "Amount", "Date"];
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.id,
        `"${r.customer.replaceAll('"', '""')}"`,
        r.status,
        r.amount,
        new Date(r.date).toISOString(),
      ].join(",")
    ),
  ];
  const csv = lines.join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename);
}

export function exportExcel(rows: OrderRow[], filename = "orders.xlsx") {
  const wsData = rows.map((r) => ({
    "Order ID": r.id,
    Customer: r.customer,
    Status: r.status,
    Amount: r.amount,
    Date: new Date(r.date).toLocaleString(),
  }));

  const ws = XLSX.utils.json_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orders");

  XLSX.writeFile(wb, filename);
}

export function exportPDF(rows: OrderRow[], filename = "orders.pdf") {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Recent Orders Report", 14, 16);

  autoTable(doc, {
    startY: 22,
    head: [["Order ID", "Customer", "Status", "Amount", "Date"]],
    body: rows.map((r) => [
      r.id,
      r.customer,
      r.status,
      `₹${r.amount}`,
      new Date(r.date).toLocaleDateString(),
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [30, 64, 175] }, // blue-ish
  });

  doc.save(filename);
}
