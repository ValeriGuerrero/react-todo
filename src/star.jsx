import React from 'react'

export function RatingReview({ rating, setRating }) {
    return (
        <>
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <span
                        key={star}
                        className='starRating'
                        style={{
                            color: rating >= star ? 'gold' : 'white',
                        }}
                        onClick={() => {
                            setRating(star)
                        }}
                    >
                        {' '}
                        ★{' '}
                    </span>
                )
            })}
        </>
    )
}