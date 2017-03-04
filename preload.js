console.log('in preload', __dirname)

PreApp = {
	log: s => {console.log('PreApp:', s)},
}

window.addEventListener('load', e => {
	PreApp.log('in onLoad')
})
