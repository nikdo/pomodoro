import React, { Component } from 'react'

export default ({sec}) => (
	<p>{Math.floor(sec/60)}:{('0' + sec%60).slice(-2)}</p>
)
