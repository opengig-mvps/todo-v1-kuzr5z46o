import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { userId: string, todoId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const todoId = parseInt(params.todoId, 10);

    if (isNaN(userId) || isNaN(todoId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or todo ID' }, { status: 400 });
    }

    const updatedTodo = await prisma.todo.updateMany({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        isComplete: true,
        updatedAt: new Date(),
      },
    });

    if (updatedTodo.count === 0) {
      return NextResponse.json({ success: false, message: 'Todo item not found or not associated with the user' }, { status: 404 });
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Todo item marked as complete',
      data: {
        id: todo?.id,
        title: todo?.title,
        description: todo?.description,
        isComplete: todo?.isComplete,
        createdAt: todo?.createdAt.toISOString(),
        updatedAt: todo?.updatedAt.toISOString(),
        userId: todo?.userId,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating todo item:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}