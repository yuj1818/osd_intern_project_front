import React, {useState, useEffect} from 'react';
import BackgroundForm from "../../Components/common/BackgroundForm";
import Main from "../../Components/main/Main";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {monthDecrease, monthIncrease, yearDecrease, yearIncrease} from "../../modules/calendar/momenter";
import { getHoliday } from "../../modules/calendar/momenter";

function MainContainer(props) {

    const { user } = useSelector(({user}) => ({ user: user.user }));

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/calendar');
    };

    const { momentValue, holiday, loadingHoliday } = useSelector(state => ({
        momentValue : state.momenter.momentValue,
        holiday: state.momenter.holiday,
        loadingHoliday: state.momenter.loading.GET_HOLIDAY,
    }));
    
    const dispatch = useDispatch();

    const yearIncreaseButton = () => dispatch(yearIncrease());
    const yearDecreaseButton = () => dispatch(yearDecrease());
    const monthIncreaseButton = () => dispatch(monthIncrease());
    const monthDecreaseButton = () => dispatch(monthDecrease());

    useEffect(() => {
        dispatch(getHoliday(momentValue));
    }, [momentValue]);

    return (
        <div>
            <BackgroundForm />
            {user &&
                <div>
                    <Main
                        onClick={onClick}                        
                        momentValue={momentValue}
                        yearIncreaseButton={yearIncreaseButton}
                        yearDecreaseButton={yearDecreaseButton}
                        monthIncreaseButton={monthIncreaseButton}
                        monthDecreaseButton={monthDecreaseButton}
                        loadingHoliday={loadingHoliday}
                        Holidays={holiday}
                    />
                </div>
            }
        </div>
    );
}

export default React.memo(MainContainer);