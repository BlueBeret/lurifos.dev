import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"
export default function Home() {
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                {session.user.email}<br />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    }
    return (
        <div>
            Click to sign into your user account <br />
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    );
}