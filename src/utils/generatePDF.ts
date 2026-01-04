import jsPDF from "jspdf";

type PdfData = {
  total: number;
  currency: "USD" | "ETB";
  timelineWeeks: number;
  websiteType: string;
  designComplexity: string;
  features: Record<string, boolean>;
};

export const generatePdf = (data: PdfData) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("Website Cost Estimate", 20, y);

  y += 12;
  doc.setFontSize(12);
  doc.text(`Website Type: ${data.websiteType}`, 20, y);
  y += 8;
  doc.text(`Design: ${data.designComplexity}`, 20, y);
  y += 8;
  doc.text(`Timeline: ${data.timelineWeeks} weeks`, 20, y);

  y += 12;
  doc.text(`Total Cost: ${data.total.toFixed(2)} ${data.currency}`, 20, y);

  y += 12;
  doc.text("Included Features:", 20, y);

  y += 8;
  Object.entries(data.features)
    .filter(([_, value]) => value)
    .forEach(([key]) => {
      doc.text(`• ${key}`, 24, y);
      y += 6;
    });

  y += 10;
  doc.setFontSize(10);
  doc.text(
    "This estimate is approximate and may change based on final requirements.",
    20,
    y
  );

  doc.save("website-estimate.pdf");
};
