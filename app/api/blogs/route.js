import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

// Function to generate unique slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export async function GET(request) {
  try {
    await dbConnect();

    // Fetch all blogs sorted by date (newest first)
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return Response.json(
      {
        success: true,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch blogs error:', error);
    return Response.json(
      { error: 'An error occurred while fetching blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const { title, description, content, category, image, author, author_img } =
      await request.json();

    if (!title || !description || !content || !category || !image) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    let slug = generateSlug(title);
    
    // Check if slug already exists and make it unique
    let existingBlog = await Blog.findOne({ slug });
    let counter = 1;
    const originalSlug = slug;
    while (existingBlog) {
      slug = `${originalSlug}-${counter}`;
      existingBlog = await Blog.findOne({ slug });
      counter++;
    }

    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      category,
      image,
      author: author || 'Admin',
      author_img: author_img || '/profile_icon.png',
    });

    return Response.json(
      {
        success: true,
        message: 'Blog created successfully',
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create blog error:', error);
    return Response.json(
      { error: 'An error occurred while creating the blog' },
      { status: 500 }
    );
  }
}
