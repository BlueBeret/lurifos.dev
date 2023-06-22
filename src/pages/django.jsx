// return redirect to https://github.com/BlueBeret/Python-and-Django-Rest-Framework-Tutorial
// with server side redirect

export const getServerSideProps = async (context) => {
    return {
        redirect: {
            statusCode: 301,
            destination: 'https://github.com/BlueBeret/Python-and-Django-Rest-Framework-Tutorial'
        }
    }
}

export default function Django() {
    return (
        <div></div>
    )
}