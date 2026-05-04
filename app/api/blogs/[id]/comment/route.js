import Blog from '@/lib/models/Blog';
import dbConnect from '@/lib/db';

export async function POST(request, context) {
  try {
    await dbConnect();
    const { params } = context;
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    const { text, author } = await request.json();

    if (!text || !author) {
      return Response.json({ success: false, error: 'Text and author are required' }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: { text, author } } },
      { new: true }
    );

    if (!blog) {
      return Response.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return Response.json({ success: true, data: blog.comments }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
