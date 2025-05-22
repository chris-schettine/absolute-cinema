import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

import './index.scss'

export interface Props {
    rating: number
}

export default function StarRating(props:Props) {
    const numStars = props.rating / 2
    
    const fullStars = [];
    const emptyStars = [];
    const halfStars = [];

    let rest = numStars;

    for (let i=0; i<5; i++) {
        if (i<numStars && rest>1) {
            fullStars.push(i);
        } else if (rest>0 && rest<1) {
            halfStars.push(i);
        } else {
            emptyStars.push(i);
        }

        rest--;
    }

    return (
        <div className="movie-rate">
            {fullStars.map(index =>
                <FaStar key={index}/>
            )}
            {halfStars.map(index =>
                <FaStarHalfAlt key={index}/>
            )}
            {emptyStars.map(index =>
                <FaRegStar key={index}/>
            )}
        </div>
    )
}