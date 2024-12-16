"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { LoaderCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type TodoFormData = z.infer<typeof todoSchema>;

const TodoPage: React.FC = () => {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (!session) return;
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/todos`);
        setTodos(res?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [session]);

  const onSubmit = async (data: TodoFormData) => {
    try {
      const payload = {
        title: data?.title,
        description: data?.description,
      };

      let response;
      if (editingTodo) {
        response = await api.patch(
          `/api/users/${session?.user?.id}/todos/${editingTodo?.id}`,
          payload
        );
      } else {
        response = await api.post(
          `/api/users/${session?.user?.id}/todos`,
          payload
        );
      }

      if (response?.data?.success) {
        toast.success(
          editingTodo ? "Todo updated successfully!" : "Todo created successfully!"
        );
        reset();
        setEditingTodo(null);
        setTodos((prev) =>
          editingTodo
            ? prev?.map((todo) =>
                todo?.id === editingTodo?.id ? response?.data?.data : todo
              )
            : [...prev, response?.data?.data]
        );
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(
        `/api/users/${session?.user?.id}/todos/${id}`
      );
      if (response?.data?.success) {
        toast.success("Todo deleted successfully!");
        setTodos((prev) => prev?.filter((todo) => todo?.id !== id));
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const response = await api.patch(
        `/api/users/${session?.user?.id}/todos/${id}/complete`
      );
      if (response?.data?.success) {
        toast.success("Todo marked as complete!");
        setTodos((prev) =>
          prev?.map((todo) =>
            todo?.id === id ? { ...todo, isComplete: true } : todo
          )
        );
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Todo Management</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>{editingTodo ? "Edit Todo" : "Create Todo"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                {...register("title")}
                placeholder="Enter todo title"
                defaultValue={editingTodo?.title}
              />
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors?.title?.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Textarea
                {...register("description")}
                placeholder="Enter todo description"
                defaultValue={editingTodo?.description}
              />
              {errors?.description && (
                <p className="text-red-500 text-sm">
                  {errors?.description?.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  {editingTodo ? "Updating Todo..." : "Creating Todo..."}
                </>
              ) : editingTodo ? (
                "Update Todo"
              ) : (
                "Create Todo"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          todos?.map((todo) => (
            <Card key={todo?.id} className="mb-4">
              <CardHeader>
                <CardTitle>{todo?.title}</CardTitle>
              </CardHeader>
              <CardContent>{todo?.description}</CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <Button
                    variant="outline"
                    onClick={() => setEditingTodo(todo)}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="ml-2">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the todo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          onClick={() => handleDelete(todo?.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleComplete(todo?.id)}
                  disabled={todo?.isComplete}
                >
                  {todo?.isComplete ? "Completed" : "Mark as Complete"}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoPage;