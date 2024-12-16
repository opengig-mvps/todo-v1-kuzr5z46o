import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string, todoId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const todoId = parseInt(params.todoId, 10);
    
    if (isNaN(userId) || isNaN(todoId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or todo ID' }, { status: 400 });
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) {
      return NextResponse.json({ success: false, message: 'Todo item not found' }, { status: 404 });
    }

    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json({ success: true, message: 'Todo item deleted successfully', data: null }, { status: 200 });

  } catch (error: any) {
    console.error('Error deleting todo item:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}

type TodoRequestBody = {
  title: string;
  description: string;
};

export async function PUT(
  request: Request,
  { params }: { params: { userId: string; todoId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const todoId = parseInt(params.todoId, 10);
    if (isNaN(userId) || isNaN(todoId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or todo ID' }, { status: 400 });
    }

    const body: TodoRequestBody = await request.json();
    const { title, description } = body;
    if (!title || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const updatedTodo = await prisma.todo.updateMany({
      where: { id: todoId, userId: userId },
      data: {
        title: String(title),
        description: String(description),
        updatedAt: new Date().toISOString(),
      },
    });

    if (updatedTodo.count === 0) {
      return NextResponse.json({ success: false, message: 'Todo item not found or not associated with the user' }, { status: 404 });
    }

    const todo = await prisma.todo.findFirst({
      where: { id: todoId, userId: userId },
    });

    return NextResponse.json({
      success: true,
      message: 'Todo item updated successfully',
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