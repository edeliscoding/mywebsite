import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("accessToken")?.value || "";
    const decodedToken = jwt.verify(token, "34343d43435132434abe235");
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
