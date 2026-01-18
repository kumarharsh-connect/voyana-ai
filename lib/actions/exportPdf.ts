export async function exportTripPdf({
  tripId,
  destination,
  onStart,
  onFinish,
  onError,
}: {
  tripId: string;
  destination: string;
  onStart?: () => void;
  onFinish?: () => void;
  onError?: (error: unknown) => void;
}) {
  try {
    onStart?.();

    const res = await fetch(`/api/trips/${tripId}/export/pdf`, {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error('Failed to export PDF');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${destination.replace(/\s+/g, '-')}-itinerary.pdf`;
    document.body.appendChild(a);

    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF export failed:', error);
    onError?.(error);
  } finally {
    onFinish?.();
  }
}
