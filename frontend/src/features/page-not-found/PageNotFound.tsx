import Navigation from "../../components/navigation/Navigation"
import Footer from "../../components/footer/Footer"
import "./PageNotFound.css";

const PageNotFound = () => {
    return (
        <>
            <Navigation />
            <div className="not-found-container1">
                <h3>OOPS! PAGE NOT FOUND</h3>
                <div className="not-found-container2">
                    <h1 className="not-found-text2">404</h1>
                </div>
                <div className="not-found-container3">
                    <h2 className="not-found-text3">
                    WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
                    </h2>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PageNotFound;