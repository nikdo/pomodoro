import React from 'react'

export default ({paused, start, stop}) => (
	<button
		className="btn btn-default"
		onClick={() => paused ? start() : stop()}>
			<span className={'glyphicon ' + (paused ? 'glyphicon-play' : 'glyphicon-pause')}>
			</span> {paused ? 'Start' : 'Pause'}
	</button>
) 

