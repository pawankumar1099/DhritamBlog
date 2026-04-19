export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read file and convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');

    // Determine MIME type
    const mimeType = file.type || 'image/jpeg';
    
    // Create data URL
    const dataUrl = `data:${mimeType};base64,${base64String}`;

    return Response.json(
      {
        success: true,
        url: dataUrl,
        base64: base64String,
        mimeType: mimeType,
        message: 'File uploaded successfully as base64',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: 'An error occurred while uploading the file' },
      { status: 500 }
    );
  }
}
