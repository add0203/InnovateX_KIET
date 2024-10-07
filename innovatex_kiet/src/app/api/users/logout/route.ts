// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";

// connectToDatabase();

// export async function GET(request: NextRequest) {
//   try {
//     const response = NextResponse.json(
//       { message: "User Successfully Logged Out!", success: true },
//       { status: 200 }
//     );

//     response.cookies.set("token", "", {
//       httpOnly: true,
//       expires: new Date(0),
//     });

//     return response;
//   } catch (error: any) {
//     return NextResponse.json({ error: error.messaage }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

// This is just a simple example; you may want to add database or session logic here
export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "User Successfully Logged Out!", success: true },
      { status: 200 }
    );

    // Clear the token by setting the cookie to expire
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
