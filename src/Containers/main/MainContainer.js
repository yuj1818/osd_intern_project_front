import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { increaseYear, increaseMonth, decreaseYear, decreaseMonth, getHoliday } from "../../modules/momenter";
import BackgroundForm from "../../Components/common/BackgroundForm";
import Main from "../../Components/main/Main";
import { useNavigate } from "react-router-dom";

function MainContainer({ today, increaseYear, decreaseYear, increaseMonth, decreaseMonth, getHoliday, loadingHoliday, holiday }) {

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/calendar');
    };

    let solYear = today.format('YYYY');
    let solMonth = today.format('MM');

    useEffect(() => {
        getHoliday(solYear, solMonth);
    }, [today]);

    return (
        <div>
            <BackgroundForm />
            {localStorage.getItem('onLoginUser') &&
                <div>
                    <Main
                        onClick={onClick}
                        today={today}
                        onIncreaseYear={increaseYear}
                        onDecreaseYear={decreaseYear}
                        onIncreaseMonth={increaseMonth}
                        onDecreaseMonth={decreaseMonth}
                        loadingHoliday={loadingHoliday}
                        Holidays={holiday}
                    />
                </div>
            }
        </div>
    );
}

export default connect(
    state => ({
        today: state.momenter.today,
        holiday: state.momenter.holiday,
        loadingHoliday: state.momenter.loading.GET_HOLIDAY
    }),
    {
        increaseYear,
        decreaseYear,
        increaseMonth,
        decreaseMonth,
        getHoliday
    }
)(MainContainer);