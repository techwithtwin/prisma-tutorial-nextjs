"use server";

import prisma from "@/lib/db";
import { EditMovieFormdata, EditMovieSchema } from "@/schema";

type EditMovieResponse = {
  status: "success" | "error";
  body: {
    message: string;
  };
};

export async function editMovieAction(
  data: EditMovieFormdata,
  id: number
): Promise<EditMovieResponse> {
  // using zod to validate the data
  const validatedData = EditMovieSchema.safeParse(data);

  if (!validatedData.success || !id) {
    return {
      status: "error",
      body: {
        message: "Invalid data. Try again later!",
      },
    };
  }
  const { title } = validatedData.data;

  try {
    // Edit the movie
    const updatedMovie = await prisma.movie.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

    return {
      status: "success",
      body: {
        message: `${title} movies title has been updated to ${updatedMovie.title} successfully`,
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
