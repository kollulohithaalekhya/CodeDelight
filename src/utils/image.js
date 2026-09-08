// Prepares an avatar image for upload: decodes it, downscales to a sensible
// max dimension, and re-encodes as a small JPEG. This fixes the two common
// signup failures — phone photos that are too large, and formats the API
// rejects (e.g. iPhone HEIC) — by normalising everything to a compact JPEG the
// browser could actually decode.
//
// Throws a friendly Error when the browser can't decode the file at all
// (some HEIC images on desktop), so callers can tell the user to pick a
// JPG/PNG instead of failing silently.
export async function prepareAvatar(file, { max = 512, quality = 0.9 } = {}) {
  if (!file) throw new Error("No image selected.");

  let bitmap;
  try {
    // `from-image` applies EXIF orientation so portraits aren't sideways.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      throw new Error("That image couldn't be read. Please choose a JPG or PNG photo.");
    }
  }

  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, w, h);
  if (bitmap.close) bitmap.close();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not process the image."))),
      "image/jpeg",
      quality
    );
  });

  return new File([blob], "avatar.jpg", { type: "image/jpeg" });
}
