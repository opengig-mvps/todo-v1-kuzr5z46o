import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type TodoRequestBody = {
  title: string;
  description: string;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: TodoRequestBody = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Todo item created successfully',
      data: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        isComplete: todo.isComplete,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
        userId: todo.userId,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}