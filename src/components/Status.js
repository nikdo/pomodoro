import React from 'react'

export default ({status}) => (
	<h2>
		<span className={'glyphicon ' + status.icon} aria-hidden="true"></span> {status.name}
	</h2>
)
