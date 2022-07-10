import { getProviders, signIn, useSession } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc'
import Image from "next/image"
export default function SignIn({ providers }) {
    const { data: session, status } = useSession()
    const providerIcon = {
        'google': <FcGoogle />
    }
    if (status === 'authenticated') {
        window.location.replace("/")
    }
    else return (
        <div className="content-container">
            <Image src="/images/login ilust.png" width="500" height="500" alt="login ilustration"></Image>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className="flex flex-row items-center justify-center bg-blue-500 text-white gap-2 px-4 py-2 rounded-lg">
                    <span>{providerIcon[provider.id]}</span>
                    <button onClick={() => signIn(provider.id)} className="font-semibold">

                        Continue with <bold className="font-bold">{provider.name}</bold>
                    </button>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}