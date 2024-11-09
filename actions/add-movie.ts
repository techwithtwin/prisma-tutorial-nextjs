"use server";
import prisma from "@/lib/db";
import { MovieFormdata, MovieSchema } from "@/schema";

type AddMovieResponse = {
  status: "success" | "error";
  body: {
    message: string;
  };
};

export async function addMovie(data: MovieFormdata): Promise<AddMovieResponse> {
  // using zod to validate the data
  const validatedData = MovieSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      status: "error",
      body: {
        message: "Invalid data. Try again later!",
      },
    };
  }
  const { id, title, imageUrl } = validatedData.data;

  try {
    //check if the given id already has a movie with the same id
    const movie = await prisma.movie.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (movie) throw new Error("Movie with the same id already exists");

    // create a new movie

    const addedMovie = await prisma.movie.create({
      data: {
        id: parseInt(id),
        title,
        posterPath: imageUrl,
      },
    });

    return {
      status: "success",
      body: {
        message: `${addedMovie.title} has been added successfully`,
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
