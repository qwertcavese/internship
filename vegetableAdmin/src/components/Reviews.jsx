import React, { useEffect, useState } from 'react'
import { getAllReviews } from './ApiServices';


const style = {
    // display: "flex",
    border: "1px solid black",
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
    height: "250px",
    overflowY: "auto",
    width:"60%"
}
export default function Reviews() {
    var count = 0;
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await getAllReviews();
            setReviews(res.reviews)
        }
        fetchData();
    }, [])
    // console.log(reviews);
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div className='reviews-box' style={style}>

                <h2 style={{ textAlign: "center" }}>REVIEWS</h2>
                <hr />
                <div>
                    {reviews.map((val,index) => {
                        count = count + 1;
                        return (
                            <div key={index} style={{ display: "flex", flexDirection: "column", gap: "02px", padding: "10px" }}>
                                <h4>{val.user_name}:-</h4>
                                <p>{val.text}</p>
                                <p>{val.time_stamp}</p>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
