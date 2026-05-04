import Blog from '@/lib/models/Blog';
import dbConnect from '@/lib/db';

export async function POST(request, context) {
  try {
    await dbConnect();
    const { params } = context;
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    // Use updateOne with direct filter to avoid any middleware or versioning issues
    const updateResult = await Blog.updateOne(
      { _id: id },
      { $inc: { likes: 1 } }
    );

    if (updateResult.matchedCount === 0) {
      return Response.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    // Fetch the updated document to return accurate count
    const updatedBlog = await Blog.findById(id).select('likes');

    return Response.json({ 
      success: true, 
      data: { likes: updatedBlog.likes } 
    }, { status: 200 });
  } catch (error) {
    console.error('Like error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
