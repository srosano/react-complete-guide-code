import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.log("ERROR: ",error);

    let title = "An error occurred!";
    let message = "Something went wrong!";

    if(error.status === 500){
        message = error.data.message;
        console.log("Message", message);
    }

    if(error.status === 404){
        title = "Not found!";
        message = "Could not find resource or page!";
    }

    return(
        <>
            <MainNavigation/>
            <main>
                <PageContent title={title}>
                    <p>{message}</p>
                </PageContent>
            </main>
        </>
    )

}

export default ErrorPage;