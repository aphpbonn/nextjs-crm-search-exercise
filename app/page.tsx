import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>CRM Exercise</h1>
      <p>Go to the Contacts list to start.</p>
      <p>
        <Link href="/contacts">Open Contacts</Link>
      </p>
    </main>
  );
}