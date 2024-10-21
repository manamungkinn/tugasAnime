import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
//ini untuk respone kita jika matcher nya berlangsung akan diarahin kemana
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/', request.url))
// }

export { default } from "next-auth/middleware";
//saya lebih memilih default dari next-auth untuk langsung dikasih pilihan login dahulu

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/users/:path*",
};

//'/:path* kondisi dimana setelah users/ akan otomatis di harus kan login
