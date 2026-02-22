import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ProductRow } from "@/types/products";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportProductsCSV(rows: ProductRow[], filename = "products.csv") {
  const headers = ["ID", "Name", "Category", "Price", "Stock", "Status", "CreatedAt"];
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.id,
        `"${r.name.replaceAll('"', '""')}"`,
        r.category,
        r.price,
        r.stock,
        r.status,
        new Date(r.createdAt).toISOString(),
      ].join(",")
    ),
  ];
  const csv = lines.join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename);
}

export function exportProductsExcel(rows: ProductRow[], filename = "products.xlsx") {
  const wsData = rows.map((r) => ({
    ID: r.id,
    Name: r.name,
    Category: r.category,
    Price: r.price,
    Stock: r.stock,
    Status: r.status,
    CreatedAt: new Date(r.createdAt).toLocaleString(),
  }));

  const ws = XLSX.utils.json_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");
  XLSX.writeFile(wb, filename);
}

export function exportProductsPDF(rows: ProductRow[], filename = "products.pdf") {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Products Report", 14, 16);

  autoTable(doc, {
    startY: 22,
    head: [["ID", "Name", "Category", "Price", "Stock", "Status"]],
    body: rows.map((r) => [r.id, r.name, r.category, `₹${r.price}`, r.stock, r.status]),
    styles: { fontSize: 9 },
  });

  doc.save(filename);
}
