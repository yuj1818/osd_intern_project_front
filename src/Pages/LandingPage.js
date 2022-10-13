import React from 'react';
import HeaderContainer from "../Containers/common/HeaderContainer";
import FooterContainer from "../Containers/common/FooterContainer";
import MainContainer from "../Containers/Main/MainContainer";

function LandingPage(props) {
    return (
        <div>
            <HeaderContainer />
            <MainContainer />
            <FooterContainer />
        </div>
    );
}

export default LandingPage;