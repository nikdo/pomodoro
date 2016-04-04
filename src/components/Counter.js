import React from 'react'

export default ({status, remainingTime}) => (
	<div>
		<h2>{status}</h2>
		<p className="counter">{remainingTime}</p>
	</div>
)
