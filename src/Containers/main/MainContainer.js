import React from 'react';
import BackgroundForm from "../../Components/common/BackgroundForm";
import Main from "../../Components/main/Main";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {monthDecrease, monthIncrease, yearDecrease, yearIncrease} from "../../modules/momenter";

function MainContainer(props) {

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/calendar');
    };

    const { momentValue } = useSelector(state => ({
        momentValue : state.momenter.momentValue
    }));

    const dispatch = useDispatch();

    const yearIncreaseButton = () => dispatch(yearIncrease());
    const yearDecreaseButton = () => dispatch(yearDecrease());
    const monthIncreaseButton = () => dispatch(monthIncrease());
    const monthDecreaseButton = () => dispatch(monthDecrease());

    return (
        <div>
            <BackgroundForm />
            {localStorage.getItem('onLoginUser') &&
                <div>
                    <Main
                        onClick={onClick}
                        momentValue={momentValue}
                        yearIncreaseButton={yearIncreaseButton}
                        yearDecreaseButton={yearDecreaseButton}
                        monthIncreaseButton={monthIncreaseButton}
                        monthDecreaseButton={monthDecreaseButton}
                    />
                </div>
            }
        </div>
    );
}

export default MainContainer;