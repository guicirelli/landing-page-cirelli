import { SignOutButton } from "@clerk/nextjs";

export function CustomSignOutButton() {
  return (
    <SignOutButton>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Sign out
      </button>
    </SignOutButton>
  );
}
