import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";

function DashCalendar({onClick}) {
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <Title>
                캘린더
            </Title>
            <Box>
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=366&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FSeoul&showTitle=0&showPrint=0&showCalendars=0&showTz=0&showTabs=0&showNav=1&src=c29ueXVqZW9uZzE4QGdtYWlsLmNvbQ&src=a28uc291dGhfa29yZWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%237986CB&color=%230B8043"
                    style={{border:"solid 1px #777", width:"22.6875rem", height:"22.875rem", position:"relative"}}
                ></iframe>
                <div style={{position:"absolute", width:"22.6875rem", height:"22.875rem", background:"black", opacity:"0%"}} onClick={onClick}></div>
            </Box>
        </div>
    );
}

export default DashCalendar;