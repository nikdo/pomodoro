import React from 'react'

export default ({paused, start, stop, skip, showSkip}) => (
	<div className="controls">
		<button className="btn btn-default" style={{visibility: 'hidden'}}></button>{' '}
		<button
			className="btn btn-default"
			onClick={() => paused ? start() : stop()}>
				<span className={'glyphicon ' + (paused ? 'glyphicon-play' : 'glyphicon-pause')}>
				</span> {paused ? 'Play' : 'Stop'}
		</button>{' '}
		<button
			className="btn btn-default"
			style={{visibility: showSkip ? 'visible' : 'hidden'}}
			onClick={() => skip()}>
				<span className="glyphicon glyphicon-forward"></span> Skip
		</button>
	</div>
) 

