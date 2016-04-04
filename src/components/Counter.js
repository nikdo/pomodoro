import React from 'react'

export default ({status, remainingTime}) => (
	<div>
		<h2><span className={'glyphicon ' + status.icon} aria-hidden="true"></span> {status.name}</h2>
		<p className="counter">{remainingTime}</p>
	</div>
)
