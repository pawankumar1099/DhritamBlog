import Blog from '@/lib/models/Blog';
import dbConnect from '@/lib/db';

export async function DELETE(request, context) {
  try {
    await dbConnect();
    
    // Handle both sync and async params (Next.js 16 compatibility)
    const { params } = context;
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    if (!id) {
      return Response.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Find and delete the blog by ID
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return Response.json(
        { success: false, error: 'Blog not found or already deleted' },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        success: true, 
        message: 'Blog deleted successfully',
        data: deletedBlog 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

export async function GET(request, context) {
  try {
    await dbConnect();
    
    // Handle both sync and async params (Next.js 16 compatibility)
    const { params } = context;
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    if (!id) {
      return Response.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return Response.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, data: blog },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}
