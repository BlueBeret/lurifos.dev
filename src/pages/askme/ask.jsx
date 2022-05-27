import { getSession } from "next-auth/react"
const Ask = ({ user }) => {
    if (!user) {

        return <div className="">
            To prevent spam, you must be logged in to ask a question.
        </div>
    }
    else {
        console.log("user is not logged in")
        return (
            <div className="">
                askme
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            props: {
                user: null
            }
        }
    }
    else {
        return {
            props: {
                user: session.user
            }
        }
    }
}

export default Ask