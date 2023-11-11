export function auth0__script__html_() {
	return `
<script>
	(function() {
		var location = window.location
		var search = location.search
		var search_values = _values(search.substr(1))
		var hash = location.hash
		var auth0__token = _values(hash.substr(1))
		var auth0__token__json = JSON.stringify(auth0__token)
		var redirect_url = search_values && search_values.redirect_url
		localStorage.setItem('auth0__token__json', auth0__token__json)
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
	auth0__script__html_ as auth_script_html_,
	auth0__script__html_ as _auth_script_html,
	auth0__script__html_ as _html__script__auth,
}
