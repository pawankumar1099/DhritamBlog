import Blog from '@/lib/models/Blog';
import dbConnect from '@/lib/db';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all blogs from database
    const blogs = await Blog.find({}, '_id slug createdAt updatedAt').lean();

    // Base URL - update this to match your production domain
    const baseUrl = 'https://blog.dhritam.com';

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Admin Login Page -->
  <url>
    <loc>${baseUrl}/admin/login</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Blog Pages -->
  ${blogs
    .map((blog) => {
      const blogUrl = `${baseUrl}/blog/${blog._id}`;
      const lastMod = (blog.updatedAt || blog.createdAt)
        .toISOString()
        .split('T')[0];

      return `
  <url>
    <loc>${blogUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return a minimal sitemap on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.dhritam.com/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
      status: 500,
    });
  }
}
