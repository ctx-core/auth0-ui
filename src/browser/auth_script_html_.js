export function auth_script_html_() {
    return `
<script>
	(function() {
		var location = window.location
		var search = location.search
		var search_values = _values(search.substr(1))
		var hash = location.hash
		var auth0_token = _values(hash.substr(1))
		var auth0_token_json = JSON.stringify(auth0_token)
		var redirect_url =
					search_values
					&& search_values.redirect_url
		localStorage.setItem('auth0_token_json', auth0_token_json)
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
	`.trim();
}
export { auth_script_html_ as _auth_script_html, auth_script_html_ as _html__script__auth, };
//# sourceMappingURL=../src/browser/auth_script_html_.js.map