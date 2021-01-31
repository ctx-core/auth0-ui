export function _auth_script_html() {
	return `
<script>
	(function() {
		var location = window.location
		var search = location.search
		var values__search = _values(search.substr(1))
		var hash = location.hash
		var auth0_token = _values(hash.substr(1))
		var json__token__auth0 = JSON.stringify(auth0_token)
		var redirect_url =
					values__search
					&& values__search.redirect_url
		localStorage.setItem('json__token__auth0', json__token__auth0)
		if (redirect_url) {
			location.href = redirect_url
		}
		function _values(string) {
			var segments = string.split('&')
			var values = {}
			for (var i=0; i < segments.length; i++) {
				var pair = segments[i].split('=')
				var key = decodeURIComponent(pair[0])
				var value = decodeURIComponent(pair[1])
				values[key] = value
			}
			return values
		}
	})()
</script>
	`.trim()
}
export {
	_auth_script_html as _html__script__auth
}