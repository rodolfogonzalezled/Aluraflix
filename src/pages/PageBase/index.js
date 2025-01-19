import Container from "components/Container";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";

function PageBase(){
    return(
        <main>
            <Header/>
                <Container>
                    <Outlet/>
                </Container>
            <Footer/>
        </main>
    )
}

export default PageBase;