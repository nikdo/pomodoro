import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

export default ({sec}) => {
	const remainingTime = Math.floor(sec/60) + ':' + ('0' + sec%60).slice(-2)
	return (
		<DocumentTitle title={remainingTime}>
			<div>{remainingTime}</div>
		</DocumentTitle>
	)
}