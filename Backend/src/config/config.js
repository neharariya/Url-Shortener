export const cookieOptions = {
    maxAge: 1000 * 60 * 15, // 15 minutes instead of 5
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" // Only secure in production
}