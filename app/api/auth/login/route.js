import dbConnect from '@/lib/db';
import Admin from '@/lib/models/Admin';

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Simple password comparison (in production, use bcrypt)
    if (admin.password !== password) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Login successful',
        admin: {
          email: admin.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

// Create admin user endpoint (for initial setup)
export async function PUT(request) {
  try {
    await dbConnect();

    const { email, password, adminKey } = await request.json();

    // Simple admin key check (change this to your own admin key)
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let admin = await Admin.findOne({ email });

    if (admin) {
      return Response.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    admin = await Admin.create({ email, password });

    return Response.json(
      {
        success: true,
        message: 'Admin user created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin creation error:', error);
    return Response.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
