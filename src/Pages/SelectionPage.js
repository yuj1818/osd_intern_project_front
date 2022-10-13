import React from 'react';
import HeaderContainer from "../Containers/common/HeaderContainer";
import FooterContainer from "../Containers/common/FooterContainer";
import SelectionContainer from "../Containers/selection/SelectionContainer";

function SelectionPage(props) {
    return (
        <div>
            <HeaderContainer />
            <SelectionContainer />
            <FooterContainer />
        </div>
    );
}

export default SelectionPage;