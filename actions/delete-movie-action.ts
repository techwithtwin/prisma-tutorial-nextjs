"use server";

import prisma from "@/lib/db";

type deleteMovieResponse = {
  status: "success" | "error";
  body: {
    message: string;
  };
};

export async function deleteMovieAction(
  id: number
): Promise<deleteMovieResponse> {
  try {
    // delete movie with the given id
    const movie = await prisma.movie.delete({
      where: {
        id: id,
      },
    });

    return {
      status: "success",
      body: {
        message: `${movie.title} has been deleted successfully`,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        body: {
          message: error.message,
        },
      };
    }

    return {
      status: "error",
      body: {
        message: "Something went wrong. Try again later!",
      },
    };
  }
}
