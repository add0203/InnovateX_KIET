// Import necessary modules and functions
import { connectToDatabase } from "@/lib/mongodb"; // Connect to the MongoDB database
import User from "@/models/user"; // Import the User model (for accessing the user data in the database)
import { NextRequest, NextResponse } from "next/server"; // Import Next.js request and response objects

// Establish a connection to the database as soon as this file runs
connectToDatabase();

// The POST function handles a POST request to verify a user's email
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the incoming request to get the request data
    const reqBody = await request.json();

    // Extract the 'token' from the parsed request body
    const { token } = reqBody;

    // Find the user in the database by matching the token and checking that the token has not expired.
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // If no user is found (invalid or expired token), return a 401 Unauthorized response
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    // If the user is found, set the user's 'isVerified' property to true,
    // and remove the verifyToken and its expiry fields since the verification is complete.
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Save the updated user data back to the database
    await user.save();

    // Return a 200 OK response with a success message
    return NextResponse.json(
      { message: "Email Verified Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    // Catch any errors that occur and return a 500 Internal Server Error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// // Import necessary modules and functions
// import { connectToDatabase } from "@/lib/mongodb"; // Connect to the MongoDB database
// import User from "@/models/user"; // Import the User model (for accessing the user data in the database)
// import { NextRequest, NextResponse } from "next/server"; // Import Next.js request and response objects
// import emailjs from "@emailjs/browser"; // Import EmailJS

// // Establish a connection to the database as soon as this file runs
// connectToDatabase();

// // Define the shape of the incoming request body
// interface VerifyRequestBody {
//   token: string;
// }

// // Define the shape of the email parameters for EmailJS
// interface EmailParams {
//   to_name: string;
//   to_email: string;
//   message: string;
// }

// // Define the shape of the environment variables
// interface EmailJSEnv {
//   NEXT_PUBLIC_EMAILJS_SERVICE_ID: string;
//   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
//   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
// }

// interface EmailParams {
//   [key: string]: string;
// }

// // Type-safe POST handler for verifying a user's email and sending confirmation email
// export async function POST(request: NextRequest): Promise<NextResponse> {
//   try {
//     // Parse the JSON body from the incoming request to get the request data
//     const reqBody: VerifyRequestBody = await request.json();

//     // Extract the 'token' from the parsed request body
//     const { token } = reqBody;

//     // Find the user in the database by matching the token and checking that the token has not expired.
//     const user = await User.findOne({
//       verifyToken: token,
//       verifyTokenExpiry: { $gt: Date.now() },
//     });

//     // If no user is found (invalid or expired token), return a 401 Unauthorized response
//     if (!user) {
//       return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
//     }

//     // If the user is found, set the user's 'isVerified' property to true,
//     // and remove the verifyToken and its expiry fields since the verification is complete.
//     user.isVerified = true;
//     user.verifyToken = undefined;
//     user.verifyTokenExpiry = undefined;

//     // Save the updated user data back to the database
//     await user.save();

//     // Send email using EmailJS to notify the user of successful verification
//     const emailParams: EmailParams = {
//       to_name: user.name ?? "User", // Fallback to 'User' if name is undefined
//       to_email: user.email, // Assuming your user model has an 'email' field
//       message: `Dear ${user.name}, your email has been successfully verified. Welcome aboard!`,
//     };

//     // Ensure environment variables are defined
//     const emailJSEnv: EmailJSEnv = {
//       NEXT_PUBLIC_EMAILJS_SERVICE_ID:
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
//     };

//     try {
//       await emailjs.send(
//         emailJSEnv.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//         emailJSEnv.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
//         emailParams as Record<string, unknown>,
//         emailJSEnv.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
//       );
//       console.log("Verification email sent successfully");
//     } catch (emailError: unknown) {
//       console.log("Failed to send verification email:", emailError);
//     }

//     // Return a 200 OK response with a success message
//     return NextResponse.json(
//       {
//         message: "Email Verified Successfully, confirmation email sent.",
//         success: true,
//       },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     // Catch any errors that occur and return a 500 Internal Server Error response
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
