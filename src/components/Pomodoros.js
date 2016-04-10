import React from 'react'

export default ({count}) => (
	<div className="pomodoros">
		{Array.apply(0, Array(count)).map((x, i) =>
			<span className="pomodoro" key={i}></span>)
		}
	</div>
)