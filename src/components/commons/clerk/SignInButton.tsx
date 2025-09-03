import { SignInButton } from "@clerk/nextjs";

export function CustomSignInButton() {
  return (
    <SignInButton mode="modal">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign in
      </button>
    </SignInButton>
  );
}
