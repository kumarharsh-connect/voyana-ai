import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function buildItineraryPdf(trip: {
  destination: string;
  itinerary: any;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 800;

  const drawText = (text: string, size = 12, offset = 20) => {
    page.drawText(text, {
      x: 40,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
    y -= offset;
  };

  drawText(`Trip Itinerary: ${trip.destination}`, 20, 40);
  drawText(' ');

  const { overview, days } = trip.itinerary;

  if (overview?.summary) {
    drawText(`Overview: ${overview.summary}`, 12, 30);
    drawText(' ');
  }

  // days

  for (const day of days) {
    drawText(`Day ${day.day}`, 16, 30);

    for (const activity of day.activities) {
      drawText(` ${activity.name}`, 12, 18);
      drawText(` ${activity.description}`, 10, 16);

      if (activity.location) {
        drawText(` Location: ${activity.location.address}`, 9, 14);
      }
    }
    drawText(' ');
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
