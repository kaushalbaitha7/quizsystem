import React, { useEffect, useState, useCallback } from "react";

function Timer({ onTimeUp }) {

    const TOTAL_TIME = 45 * 60;

    const getRemainingTime = useCallback(() => {

        const startTime = localStorage.getItem("examStartTime");

        if (!startTime) return TOTAL_TIME;

        const elapsed = Math.floor((Date.now() - Number(startTime)) / 1000);

        return Math.max(TOTAL_TIME - elapsed, 0);

    }, []);

    const [timeLeft, setTimeLeft] = useState(getRemainingTime);

    useEffect(() => {

        const interval = setInterval(() => {

            const remaining = getRemainingTime();

            setTimeLeft(remaining);

            if (remaining <= 0) {

                clearInterval(interval);

                localStorage.removeItem("examStartTime");

                onTimeUp();

            }

        }, 1000);

        return () => clearInterval(interval);

    }, [getRemainingTime, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="timer">
            ⏰ {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
    );

}

export default Timer;